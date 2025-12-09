import { AlertTriangle, Trash2, Info } from 'lucide-react';
import Modal from './Modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

const variantConfig = {
  danger: {
    icon: Trash2,
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-400',
    buttonBg: 'bg-red-500/80 hover:bg-red-500',
  },
  warning: {
    icon: AlertTriangle,
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    buttonBg: 'bg-amber-500/80 hover:bg-amber-500',
  },
  info: {
    icon: Info,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    buttonBg: 'bg-blue-500/80 hover:bg-blue-500',
  },
};

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false,
}: ConfirmDialogProps) => {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
      <div className="text-center py-4">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-full ${config.iconBg} flex items-center justify-center mx-auto mb-4`}>
          <Icon size={32} className={config.iconColor} />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>

        {/* Message */}
        <p className="text-white/60 mb-6">{message}</p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl liquid-glass-subtle text-white/60 hover:text-white hover:bg-white/[0.08] transition-all disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 px-4 py-2.5 rounded-xl text-white font-medium transition-all disabled:opacity-50 backdrop-blur-sm ${config.buttonBg}`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
