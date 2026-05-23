import { supabaseUrl } from '../../utils/supabase/info';

if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_PROJECT_ID in environment');
}

const API_BASE_URL = `${supabaseUrl}/functions/v1/make-server-88c8b05a`;

const fetchWithTimeout = async (input: RequestInfo, init: RequestInit = {}, timeout = 15000) => {
  const controller = new AbortController();
  const id = window.setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    window.clearTimeout(id);
  }
};

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  country?: string;
  city?: string;
  region?: string;
  fullAddress?: string;
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string | null;
  conversationId?: string | null;
  notes: Array<{ text: string; createdAt: string }>;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: 'client' | 'admin';
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  contactRequestId?: string | null;
  name: string;
  channel: string;
  tags: string[];
  unread: number;
  important: boolean;
  status: 'active' | 'archived' | 'resolved' | 'pending';
  lastMessage: string;
  timestamp: string;
  messages?: Message[];
}

export interface Appointment {
  id: string;
  contactRequestId: string | null;
  title: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
  assignedTo: string | null;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  relatedId: string;
  isRead: boolean;
  createdAt: string;
}

export interface Stats {
  totalRequests: number;
  newRequests: number;
  inProgressRequests: number;
  completedRequests: number;
  totalAppointments: number;
  unreadNotifications: number;
}

class API {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('admin_token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('admin_token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('admin_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    let response: Response;
    try {
      response = await fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });
    } catch (err: any) {
      if (err.name === 'AbortError') {
        throw new Error('Request timed out. تأكد من الاتصال وحاول مرة أخرى.');
      }
      throw new Error(`Network error: ${err?.message || String(err)}`);
    }

    if (!response.ok) {
      // Try to get a useful error payload
      const text = await response.text().catch(() => '');
      let parsed: any = null;
      try {
        parsed = text ? JSON.parse(text) : null;
      } catch (e) {
        parsed = { error: text || `HTTP ${response.status}` };
      }
      const message =
        parsed?.error || parsed?.details || parsed?.message || `HTTP ${response.status}`;
      throw new Error(message);
    }

    try {
      return await response.json();
    } catch (err: any) {
      // If response is empty or not JSON
      return {} as unknown as T;
    }
  }

  // Health check for the functions server
  async healthCheck() {
    return this.request<{ status: string }>('/health', { method: 'GET' });
  }

  // Auth
  async login(email: string, password: string) {
    const data = await this.request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.session?.access_token) {
      this.setToken(data.session.access_token);
    }
    return data;
  }

  async signup(email: string, password: string, fullName: string) {
    return this.request<any>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName }),
    });
  }

  // Contact Requests
  async submitContactRequest(data: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    service: string;
    message?: string;
    country?: string;
    city?: string;
    region?: string;
    fullAddress?: string;
  }) {
    return this.request<{ success: boolean; requestId: string; message: string }>(
      '/contact-requests',
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
    );
  }

  async getContactRequests() {
    return this.request<{ requests: ContactRequest[]; total: number }>('/contact-requests');
  }

  async getContactRequest(id: string) {
    return this.request<{ request: ContactRequest }>(`/contact-requests/${id}`);
  }

  async updateContactRequest(
    id: string,
    data: {
      status?: string;
      priority?: string;
      assignedTo?: string;
      note?: string;
    },
  ) {
    return this.request<{ success: boolean; request: ContactRequest }>(`/contact-requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Appointments
  async createAppointment(data: {
    contactRequestId?: string;
    title: string;
    description?: string;
    scheduledDate: string;
    scheduledTime: string;
    duration?: number;
    assignedTo?: string;
  }) {
    return this.request<{ success: boolean; appointment: Appointment }>('/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createCheckoutSession(data: {
    amount: number;
    currency?: string;
    name: string;
    email: string;
    description?: string;
    requestId?: string;
  }) {
    return this.request<{ url: string; id: string }>('/checkout-sessions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAppointments() {
    return this.request<{ appointments: Appointment[]; total: number }>('/appointments');
  }

  async getConversations() {
    return this.request<{ conversations: Conversation[]; total: number }>('/conversations');
  }

  async getConversation(id: string) {
    return this.request<{ conversation: Conversation }>(`/conversations/${id}`);
  }

  async sendConversationMessage(conversationId: string, content: string) {
    return this.request<{ success: boolean; message: Message; conversation: Conversation }>(
      `/conversations/${conversationId}/messages`,
      {
        method: 'POST',
        body: JSON.stringify({ content }),
      },
    );
  }

  async markConversationRead(conversationId: string) {
    return this.request<{ success: boolean; conversation: Conversation }>(
      `/conversations/${conversationId}/read`,
      { method: 'PUT' },
    );
  }

  // Notifications
  async getNotifications() {
    return this.request<{ notifications: Notification[]; total: number }>('/notifications');
  }

  async markNotificationAsRead(id: string) {
    return this.request<{ success: boolean; notification: Notification }>(
      `/notifications/${id}/read`,
      {
        method: 'PUT',
      },
    );
  }

  // Stats
  async getStats() {
    return this.request<{ stats: Stats }>('/stats');
  }
}

export const api = new API();
