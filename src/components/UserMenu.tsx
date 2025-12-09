import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  User,
  Settings,
  CreditCard,
  LogOut,
  ChevronDown,
  Moon,
  Sun,
  Monitor,
  Shield,
  Keyboard,
} from 'lucide-react';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 p-1 pr-2.5 rounded-xl hover:bg-white/[0.06] transition-all ${isOpen ? 'bg-white/[0.06]' : ''}`}
      >
        <div className="relative">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-semibold text-[10px]">
            IO
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#050505]" />
        </div>
        <ChevronDown
          size={12}
          className={`text-white/40 transition-transform duration-200 hidden sm:block ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && createPortal(
        <>
          <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />
          <div
            className="fixed z-[9999] animate-scale-in origin-top-right"
            style={{ top: position.top, right: position.right }}
          >
            <div className="liquid-glass-elevated rounded-2xl overflow-hidden w-64">
              {/* User Info */}
              <div className="px-4 py-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-semibold text-sm">
                    IO
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">Ismail Oktay</p>
                    <p className="text-xs text-white/40 truncate">ismail@example.com</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-pink-500/15 text-pink-400 text-[10px] font-medium">
                    Pro Plan
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-[10px] font-medium flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    Online
                  </span>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-1.5">
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all group">
                  <User size={16} />
                  <span className="text-sm flex-1 text-left">Profile</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all group">
                  <Settings size={16} />
                  <span className="text-sm flex-1 text-left">Settings</span>
                  <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[9px] text-white/30">⌘,</kbd>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all group">
                  <CreditCard size={16} />
                  <span className="text-sm flex-1 text-left">Billing</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all group">
                  <Shield size={16} />
                  <span className="text-sm flex-1 text-left">Security</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all group">
                  <Keyboard size={16} />
                  <span className="text-sm flex-1 text-left">Shortcuts</span>
                  <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[9px] text-white/30">⌘/</kbd>
                </button>
              </div>

              {/* Theme Switcher */}
              <div className="px-4 py-3 border-t border-white/[0.06]">
                <p className="text-[9px] text-white/30 uppercase tracking-widest mb-2">Theme</p>
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md bg-white/[0.08] text-white text-[11px] font-medium">
                    <Moon size={12} />
                    Dark
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-white/40 hover:text-white text-[11px] font-medium transition-colors">
                    <Sun size={12} />
                    Light
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-white/40 hover:text-white text-[11px] font-medium transition-colors">
                    <Monitor size={12} />
                    Auto
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="p-1.5 border-t border-white/[0.06]">
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all">
                  <LogOut size={16} />
                  <span className="text-sm">Log out</span>
                </button>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
};

export default UserMenu;
