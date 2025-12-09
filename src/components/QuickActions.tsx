import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Plus,
  UserPlus,
  ShoppingCart,
  Package,
  FileText,
  Upload,
  Download,
  FolderPlus,
  ChevronDown,
} from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  color: string;
}

const actions: QuickAction[] = [
  { id: 'user', label: 'New User', icon: <UserPlus size={16} />, shortcut: '⌘U', color: 'text-purple-400' },
  { id: 'order', label: 'New Order', icon: <ShoppingCart size={16} />, shortcut: '⌘O', color: 'text-pink-400' },
  { id: 'product', label: 'New Product', icon: <Package size={16} />, color: 'text-blue-400' },
  { id: 'project', label: 'New Project', icon: <FolderPlus size={16} />, color: 'text-emerald-400' },
  { id: 'invoice', label: 'New Invoice', icon: <FileText size={16} />, color: 'text-amber-400' },
  { id: 'import', label: 'Import Data', icon: <Upload size={16} />, color: 'text-white/60' },
  { id: 'export', label: 'Export Data', icon: <Download size={16} />, shortcut: '⌘E', color: 'text-white/60' },
];

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        left: rect.left,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      return () => window.removeEventListener('resize', updatePosition);
    }
  }, [isOpen]);

  return (
    <>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-xl
          bg-gradient-to-r from-pink-500 to-pink-600
          hover:from-pink-400 hover:to-pink-500
          text-white text-sm font-medium
          shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40
          transition-all duration-300
          ${isOpen ? 'scale-95' : 'hover:scale-105'}
        `}
      >
        <Plus size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
        <span className="hidden sm:inline">New</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Panel */}
            <div
              className="fixed z-[9999] animate-slide-in-from-bottom-2"
              style={{ top: position.top, left: position.left }}
            >
              <div className="bg-[#141414] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden min-w-[200px]">
                <div className="py-2">
                  {actions.map((action, index) => (
                    <div key={action.id}>
                      {index === 5 && (
                        <div className="my-2 border-t border-white/10" />
                      )}
                      <button
                        onClick={() => {
                          console.log(`Action: ${action.id}`);
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors group"
                      >
                        <span className={`${action.color} group-hover:scale-110 transition-transform`}>
                          {action.icon}
                        </span>
                        <span className="flex-1 text-left text-sm text-white/80 group-hover:text-white">
                          {action.label}
                        </span>
                        {action.shortcut && (
                          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-white/40">
                            {action.shortcut}
                          </kbd>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
};

export default QuickActions;
