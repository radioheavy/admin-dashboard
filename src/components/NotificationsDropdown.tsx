import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Bell,
  UserPlus,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  CreditCard,
  X,
  Check,
  Settings,
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'order' | 'user' | 'payment';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: '1', type: 'user', title: 'New user registered', message: 'John Doe created an account', time: '2 min ago', read: false },
  { id: '2', type: 'order', title: 'New order received', message: 'Order #1234 worth $2,499', time: '15 min ago', read: false },
  { id: '3', type: 'payment', title: 'Payment successful', message: '$1,299 from Sarah Williams', time: '1 hour ago', read: false },
  { id: '4', type: 'warning', title: 'Low stock alert', message: 'iPhone 15 Pro - Only 3 left', time: '2 hours ago', read: true },
  { id: '5', type: 'success', title: 'Export completed', message: 'Your data export is ready', time: '3 hours ago', read: true },
];

const typeConfig = {
  success: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
  warning: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/15' },
  info: { icon: Bell, color: 'text-blue-400', bg: 'bg-blue-500/15' },
  order: { icon: ShoppingCart, color: 'text-pink-400', bg: 'bg-pink-500/15' },
  user: { icon: UserPlus, color: 'text-purple-400', bg: 'bg-purple-500/15' },
  payment: { icon: CreditCard, color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
};

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      return () => window.removeEventListener('resize', updatePosition);
    }
  }, [isOpen]);

  const markAllAsRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));
  const markAsRead = (id: string) => setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  const removeNotification = (id: string) => setNotifications(notifications.filter(n => n.id !== id));

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl hover:bg-white/[0.06] text-white/50 hover:text-white transition-all relative"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full" />
        )}
      </button>

      {isOpen && createPortal(
        <>
          <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />
          <div
            className="fixed z-[9999] w-80 animate-scale-in origin-top-right"
            style={{ top: position.top, right: position.right }}
          >
            <div className="liquid-glass-elevated rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-pink-500/20 text-pink-400 text-[10px] font-medium">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white transition-all">
                      <Check size={14} />
                    </button>
                  )}
                  <button className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white transition-all">
                    <Settings size={14} />
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="max-h-[320px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <Bell size={32} className="mx-auto mb-2 text-white/20" />
                    <p className="text-sm text-white/40">No notifications</p>
                  </div>
                ) : (
                  notifications.map(notification => {
                    const config = typeConfig[notification.type];
                    const Icon = config.icon;
                    return (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors cursor-pointer group ${!notification.read ? 'bg-white/[0.02]' : ''}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className={`p-2 rounded-lg ${config.bg} shrink-0`}>
                          <Icon size={14} className={config.color} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-sm truncate ${!notification.read ? 'text-white font-medium' : 'text-white/70'}`}>
                              {notification.title}
                            </p>
                            {!notification.read && <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0 mt-1.5" />}
                          </div>
                          <p className="text-xs text-white/40 truncate">{notification.message}</p>
                          <p className="text-[10px] text-white/30 mt-1">{notification.time}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); removeNotification(notification.id); }}
                          className="p-1 rounded-lg hover:bg-white/[0.08] text-white/30 hover:text-white opacity-0 group-hover:opacity-100 transition-all shrink-0"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="px-3 py-2 border-t border-white/[0.06]">
                  <button className="w-full py-2 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/[0.04] transition-all">
                    View all notifications
                  </button>
                </div>
              )}
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
};

export default NotificationsDropdown;
