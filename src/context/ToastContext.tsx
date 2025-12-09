import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (type: ToastType, message: string, duration?: number) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const toastConfig = {
  success: {
    icon: CheckCircle,
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
  },
  error: {
    icon: XCircle,
    bg: 'bg-red-500/20',
    border: 'border-red-500/30',
    text: 'text-red-400',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
  },
  info: {
    icon: Info,
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
  },
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string, duration = 4000) => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts(prev => [...prev, { id, type, message, duration }]);

      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    [removeToast]
  );

  const success = useCallback((message: string) => showToast('success', message), [showToast]);
  const error = useCallback((message: string) => showToast('error', message), [showToast]);
  const warning = useCallback((message: string) => showToast('warning', message), [showToast]);
  const info = useCallback((message: string) => showToast('info', message), [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
      {children}
      {createPortal(
        <div className="fixed bottom-4 right-4 z-[99999] flex flex-col gap-2 pointer-events-none">
          {toasts.map(toast => {
            const config = toastConfig[toast.type];
            const Icon = config.icon;

            return (
              <div
                key={toast.id}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl
                  ${config.bg} ${config.border} border
                  backdrop-blur-xl shadow-lg shadow-black/20
                  animate-slide-in-from-bottom-2 pointer-events-auto
                  min-w-[300px] max-w-[400px]
                `}
              >
                <Icon size={20} className={config.text} />
                <p className="flex-1 text-sm text-white">{toast.message}</p>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="p-1 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
