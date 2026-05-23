import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

// Types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  updateToast: (id: string, updates: Partial<Toast>) => void;
}

// Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Provider Component
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { ...toast, id, duration: toast.duration ?? 5000 };

    setToasts((prev) => [...prev, newToast]);

    // Auto-remove after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, newToast.duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateToast = useCallback((id: string, updates: Partial<Toast>) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, updateToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

// Container Component
function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div
      className="fixed bottom-4 left-4 z-[100] flex flex-col gap-3 max-w-sm"
      role="alert"
      aria-live="polite"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Individual Toast Component
function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const icons = {
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
    warning: <AlertCircle size={20} />,
    info: <Info size={20} />,
  };

  const colors = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'text-green-600',
      title: 'text-green-800',
      message: 'text-green-700',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'text-red-600',
      title: 'text-red-800',
      message: 'text-red-700',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: 'text-yellow-600',
      title: 'text-yellow-800',
      message: 'text-yellow-700',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      title: 'text-blue-800',
      message: 'text-blue-700',
    },
  };

  const color = colors[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={`rounded-xl border p-4 shadow-lg backdrop-blur-sm ${color.bg} ${color.border}`}
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${color.icon}`}>{icons[toast.type]}</div>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-sm ${color.title}`}>{toast.title}</p>
          {toast.message && <p className={`text-sm mt-1 ${color.message}`}>{toast.message}</p>}
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
          aria-label="إغلاق الإشعار"
        >
          <X size={16} className={color.icon} />
        </button>
      </div>
    </motion.div>
  );
}

// Custom hooks for easy toast creation
function buildToastPayload(type: ToastType, title: string, message?: string) {
  return message ? { type, title, message } : { type, title };
}

export function useSuccessToast() {
  const { addToast } = useToast();
  return (title: string, message?: string) =>
    addToast(buildToastPayload('success', title, message));
}

export function useErrorToast() {
  const { addToast } = useToast();
  return (title: string, message?: string) => addToast(buildToastPayload('error', title, message));
}

export function useWarningToast() {
  const { addToast } = useToast();
  return (title: string, message?: string) =>
    addToast(buildToastPayload('warning', title, message));
}

export function useInfoToast() {
  const { addToast } = useToast();
  return (title: string, message?: string) => addToast(buildToastPayload('info', title, message));
}
