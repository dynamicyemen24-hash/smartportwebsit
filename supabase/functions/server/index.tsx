import { createClient } from 'jsr:@supabase/supabase-js@2';
import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import Stripe from 'npm:stripe@12.21.0';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, { apiVersion: '2024-08-01' }) : null;

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  '/*',
  cors({
    origin: '*',
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
  }),
);

// ======================================================
// Health Check
// ======================================================
app.get('/make-server-88c8b05a/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ======================================================
// Contact Requests Endpoints
// ======================================================

// Submit new contact request
app.post('/make-server-88c8b05a/contact-requests', async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, company, service, message, country, city, region, fullAddress } =
      body;

    // Validate required fields
    if (!name || !email || !phone || !service) {
      return c.json({ error: 'Missing required fields: name, email, phone, service' }, 400);
    }

    // Generate unique ID
    const requestId = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    const contactRequest = {
      id: requestId,
      name,
      email,
      phone,
      company: company || '',
      service,
      message: message || '',
      country: country || '',
      city: city || '',
      region: region || '',
      fullAddress: fullAddress || '',
      status: 'new',
      priority: 'medium',
      assignedTo: null,
      notes: [],
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    // Store in KV
    await kv.set(`contact_request:${requestId}`, contactRequest);

    // Add to requests index
    const requestsIndex = (await kv.get('contact_requests:index')) || [];
    requestsIndex.push(requestId);
    await kv.set('contact_requests:index', requestsIndex);

    // Create notification for admin
    const notificationId = crypto.randomUUID();
    const notification = {
      id: notificationId,
      type: 'new_contact_request',
      title: 'طلب تواصل جديد',
      message: `طلب جديد من ${name} - ${service}`,
      relatedId: requestId,
      isRead: false,
      createdAt: timestamp,
    };
    await kv.set(`notification:${notificationId}`, notification);

    // Add to notifications index
    const notificationsIndex = (await kv.get('notifications:index')) || [];
    notificationsIndex.push(notificationId);
    await kv.set('notifications:index', notificationsIndex);

    return c.json(
      {
        success: true,
        requestId,
        message: 'تم استلام طلبك بنجاح. سنتواصل معك قريباً.',
      },
      201,
    );
  } catch (error) {
    console.error('Error creating contact request:', error);
    return c.json({ error: 'Failed to create contact request', details: error.message }, 500);
  }
});

// Get all contact requests (Admin only)
app.get('/make-server-88c8b05a/contact-requests', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');

    // Simple auth check (in production, use proper JWT validation)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const requestsIndex = (await kv.get('contact_requests:index')) || [];
    const requests = [];

    for (const id of requestsIndex) {
      const request = await kv.get(`contact_request:${id}`);
      if (request) {
        requests.push(request);
      }
    }

    // Sort by createdAt descending
    requests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return c.json({ requests, total: requests.length });
  } catch (error) {
    console.error('Error fetching contact requests:', error);
    return c.json({ error: 'Failed to fetch requests', details: error.message }, 500);
  }
});

// Get single contact request
app.get('/make-server-88c8b05a/contact-requests/:id', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const requestId = c.req.param('id');
    const request = await kv.get(`contact_request:${requestId}`);

    if (!request) {
      return c.json({ error: 'Request not found' }, 404);
    }

    return c.json({ request });
  } catch (error) {
    console.error('Error fetching contact request:', error);
    return c.json({ error: 'Failed to fetch request', details: error.message }, 500);
  }
});

// Update contact request status
app.put('/make-server-88c8b05a/contact-requests/:id', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const requestId = c.req.param('id');
    const body = await c.req.json();
    const { status, priority, assignedTo, note } = body;

    const request = await kv.get(`contact_request:${requestId}`);
    if (!request) {
      return c.json({ error: 'Request not found' }, 404);
    }

    // Update fields
    if (status) request.status = status;
    if (priority) request.priority = priority;
    if (assignedTo !== undefined) request.assignedTo = assignedTo;

    // Add note if provided
    if (note) {
      request.notes = request.notes || [];
      request.notes.push({
        text: note,
        createdAt: new Date().toISOString(),
      });
    }

    request.updatedAt = new Date().toISOString();

    await kv.set(`contact_request:${requestId}`, request);

    return c.json({ success: true, request });
  } catch (error) {
    console.error('Error updating contact request:', error);
    return c.json({ error: 'Failed to update request', details: error.message }, 500);
  }
});

// ======================================================
// Payment Gateway Endpoints
// ======================================================

app.post('/make-server-88c8b05a/checkout-sessions', async (c) => {
  try {
    if (!stripe) {
      return c.json({ error: 'Stripe integration is not configured' }, 500);
    }

    const body = await c.req.json();
    const { amount, currency = 'sar', name, email, description, requestId } = body;
    const parsedAmount = Number(amount);
    const finalAmount = Math.round(parsedAmount * 100);

    if (!parsedAmount || !name || !email || finalAmount <= 0) {
      return c.json({ error: 'Missing required fields: amount, name, email' }, 400);
    }

    const origin = Deno.env.get('VITE_APP_SITE_URL') || 'https://smartportsco.com';
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: 'دفع عربون استشاري',
              description: description || 'دفع مسبق لحجز استشارة أو تنفيذ مشروع',
            },
            unit_amount: finalAmount,
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        requestId: requestId || '',
        customerName: name,
      },
      success_url: `${origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?payment=cancelled`,
    });

    return c.json({ url: session.url, id: session.id });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    return c.json({ error: 'Failed to create checkout session', details: error.message }, 500);
  }
});

// ======================================================
// Appointments Endpoints
// ======================================================

// Create appointment
app.post('/make-server-88c8b05a/appointments', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const {
      contactRequestId,
      title,
      description,
      scheduledDate,
      scheduledTime,
      duration,
      assignedTo,
    } = body;

    if (!title || !scheduledDate || !scheduledTime) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const appointmentId = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    const appointment = {
      id: appointmentId,
      contactRequestId: contactRequestId || null,
      title,
      description: description || '',
      scheduledDate,
      scheduledTime,
      duration: duration || 60,
      assignedTo: assignedTo || null,
      status: 'scheduled',
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    await kv.set(`appointment:${appointmentId}`, appointment);

    const appointmentsIndex = (await kv.get('appointments:index')) || [];
    appointmentsIndex.push(appointmentId);
    await kv.set('appointments:index', appointmentsIndex);

    return c.json({ success: true, appointment }, 201);
  } catch (error) {
    console.error('Error creating appointment:', error);
    return c.json({ error: 'Failed to create appointment', details: error.message }, 500);
  }
});

// Get all appointments
app.get('/make-server-88c8b05a/appointments', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const appointmentsIndex = (await kv.get('appointments:index')) || [];
    const appointments = [];

    for (const id of appointmentsIndex) {
      const appointment = await kv.get(`appointment:${id}`);
      if (appointment) {
        appointments.push(appointment);
      }
    }

    // Sort by scheduled date/time
    appointments.sort((a, b) => {
      const dateA = new Date(`${a.scheduledDate}T${a.scheduledTime}`);
      const dateB = new Date(`${b.scheduledDate}T${b.scheduledTime}`);
      return dateB.getTime() - dateA.getTime();
    });

    return c.json({ appointments, total: appointments.length });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return c.json({ error: 'Failed to fetch appointments', details: error.message }, 500);
  }
});

// Get all conversations
app.get('/make-server-88c8b05a/conversations', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const conversationsIndex = (await kv.get('conversations:index')) || [];
    const conversations = [];

    for (const id of conversationsIndex) {
      const conversation = await kv.get(`conversation:${id}`);
      if (conversation) {
        conversations.push(conversation);
      }
    }

    conversations.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return c.json({ conversations, total: conversations.length });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return c.json({ error: 'Failed to fetch conversations', details: error.message }, 500);
  }
});

// Get single conversation thread
app.get('/make-server-88c8b05a/conversations/:id', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const conversationId = c.req.param('id');
    const conversation = await kv.get(`conversation:${conversationId}`);

    if (!conversation) {
      return c.json({ error: 'Conversation not found' }, 404);
    }

    return c.json({ conversation });
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return c.json({ error: 'Failed to fetch conversation', details: error.message }, 500);
  }
});

// Send a new admin message in a conversation
app.post('/make-server-88c8b05a/conversations/:id/messages', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const conversationId = c.req.param('id');
    const body = await c.req.json();
    const { content } = body;

    if (!content || !content.trim()) {
      return c.json({ error: 'Message content is required' }, 400);
    }

    const conversation = await kv.get(`conversation:${conversationId}`);
    if (!conversation) {
      return c.json({ error: 'Conversation not found' }, 404);
    }

    const timestamp = new Date().toISOString();
    const message = {
      id: crypto.randomUUID(),
      conversationId,
      sender: 'admin',
      content,
      timestamp,
      read: true,
    };

    conversation.messages = conversation.messages || [];
    conversation.messages.push(message);
    conversation.lastMessage = content;
    conversation.timestamp = timestamp;
    conversation.unread = 0;
    conversation.status = 'active';

    await kv.set(`conversation:${conversationId}`, conversation);

    return c.json({ success: true, message, conversation });
  } catch (error) {
    console.error('Error posting message:', error);
    return c.json({ error: 'Failed to post message', details: error.message }, 500);
  }
});

// Mark conversation as read
app.put('/make-server-88c8b05a/conversations/:id/read', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const conversationId = c.req.param('id');
    const conversation = await kv.get(`conversation:${conversationId}`);

    if (!conversation) {
      return c.json({ error: 'Conversation not found' }, 404);
    }

    conversation.unread = 0;
    await kv.set(`conversation:${conversationId}`, conversation);

    return c.json({ success: true, conversation });
  } catch (error) {
    console.error('Error marking conversation as read:', error);
    return c.json({ error: 'Failed to update conversation', details: error.message }, 500);
  }
});

// ======================================================
// Notifications Endpoints
// ======================================================

// Get all notifications
app.get('/make-server-88c8b05a/notifications', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const notificationsIndex = (await kv.get('notifications:index')) || [];
    const notifications = [];

    for (const id of notificationsIndex) {
      const notification = await kv.get(`notification:${id}`);
      if (notification) {
        notifications.push(notification);
      }
    }

    // Sort by createdAt descending
    notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return c.json({ notifications, total: notifications.length });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return c.json({ error: 'Failed to fetch notifications', details: error.message }, 500);
  }
});

// Mark notification as read
app.put('/make-server-88c8b05a/notifications/:id/read', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const notificationId = c.req.param('id');
    const notification = await kv.get(`notification:${notificationId}`);

    if (!notification) {
      return c.json({ error: 'Notification not found' }, 404);
    }

    notification.isRead = true;
    await kv.set(`notification:${notificationId}`, notification);

    return c.json({ success: true, notification });
  } catch (error) {
    console.error('Error updating notification:', error);
    return c.json({ error: 'Failed to update notification', details: error.message }, 500);
  }
});

// ======================================================
// Statistics Endpoint
// ======================================================

app.get('/make-server-88c8b05a/stats', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const requestsIndex = (await kv.get('contact_requests:index')) || [];
    const appointmentsIndex = (await kv.get('appointments:index')) || [];
    const notificationsIndex = (await kv.get('notifications:index')) || [];

    // Get all requests to calculate stats
    const requests = [];
    for (const id of requestsIndex) {
      const request = await kv.get(`contact_request:${id}`);
      if (request) requests.push(request);
    }

    const stats = {
      totalRequests: requests.length,
      newRequests: requests.filter((r) => r.status === 'new').length,
      inProgressRequests: requests.filter((r) => r.status === 'in_progress').length,
      completedRequests: requests.filter((r) => r.status === 'completed').length,
      totalAppointments: appointmentsIndex.length,
      unreadNotifications: 0,
    };

    // Count unread notifications
    for (const id of notificationsIndex) {
      const notification = await kv.get(`notification:${id}`);
      if (notification && !notification.isRead) {
        stats.unreadNotifications++;
      }
    }

    return c.json({ stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return c.json({ error: 'Failed to fetch stats', details: error.message }, 500);
  }
});

// ======================================================
// Authentication Endpoints
// ======================================================

// Simple admin login (for demo - use Supabase Auth in production)
app.post('/make-server-88c8b05a/auth/login', async (c) => {
  try {
    const { email, password } = await c.req.json();

    // Use Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      return c.json({ error: 'Invalid credentials', details: error.message }, 401);
    }

    return c.json({
      success: true,
      session: data.session,
      user: data.user,
    });
  } catch (error) {
    console.error('Error during login:', error);
    return c.json({ error: 'Login failed', details: error.message }, 500);
  }
});

// Create admin user
app.post('/make-server-88c8b05a/auth/signup', async (c) => {
  try {
    const { email, password, fullName } = await c.req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName, role: 'admin' },
    });

    if (error) {
      console.error('Signup error:', error);
      return c.json({ error: 'Failed to create user', details: error.message }, 400);
    }

    return c.json({
      success: true,
      user: data.user,
      message: 'Admin user created successfully',
    });
  } catch (error) {
    console.error('Error during signup:', error);
    return c.json({ error: 'Signup failed', details: error.message }, 500);
  }
});

Deno.serve(app.fetch);
