import { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  Search,
  LayoutDashboard,
  BarChart3,
  Users,
  ShoppingCart,
  Settings,
  Plus,
  UserPlus,
  Package,
  Download,
  Upload,
  Bell,
  HelpCircle,
  ArrowRight,
  Command,
  Wallet,
  FolderOpen,
} from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  category: 'page' | 'action' | 'user' | 'recent';
  shortcut?: string;
  action?: () => void;
}

const allCommands: CommandItem[] = [
  { id: 'dashboard', label: 'Dashboard', description: 'Main overview', icon: <LayoutDashboard size={16} />, category: 'page' },
  { id: 'analytics', label: 'Analytics', description: 'View reports', icon: <BarChart3 size={16} />, category: 'page' },
  { id: 'users', label: 'Users', description: 'Manage users', icon: <Users size={16} />, category: 'page' },
  { id: 'orders', label: 'Orders', description: 'View orders', icon: <ShoppingCart size={16} />, category: 'page' },
  { id: 'transactions', label: 'Transactions', description: 'Payment history', icon: <Wallet size={16} />, category: 'page' },
  { id: 'projects', label: 'Projects', description: 'Manage projects', icon: <FolderOpen size={16} />, category: 'page' },
  { id: 'settings', label: 'Settings', description: 'App settings', icon: <Settings size={16} />, category: 'page' },
  { id: 'new-user', label: 'Create new user', description: 'Add a new user', icon: <UserPlus size={16} />, category: 'action', shortcut: '⌘U' },
  { id: 'new-order', label: 'Create new order', description: 'Add a new order', icon: <Plus size={16} />, category: 'action', shortcut: '⌘O' },
  { id: 'new-product', label: 'Add new product', description: 'Add to inventory', icon: <Package size={16} />, category: 'action' },
  { id: 'export', label: 'Export data', description: 'Download as CSV', icon: <Download size={16} />, category: 'action', shortcut: '⌘E' },
  { id: 'import', label: 'Import data', description: 'Upload from file', icon: <Upload size={16} />, category: 'action' },
  { id: 'notifications', label: 'View notifications', description: 'Check updates', icon: <Bell size={16} />, category: 'action' },
  { id: 'help', label: 'Help & Support', description: 'Get assistance', icon: <HelpCircle size={16} />, category: 'action', shortcut: '⌘?' },
  { id: 'user-1', label: 'Alex Johnson', description: 'alex@example.com', icon: <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-[8px] text-white font-bold">AJ</div>, category: 'user' },
  { id: 'user-2', label: 'Sarah Williams', description: 'sarah@example.com', icon: <div className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-[8px] text-white font-bold">SW</div>, category: 'user' },
  { id: 'user-3', label: 'Mike Brown', description: 'mike@example.com', icon: <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-[8px] text-white font-bold">MB</div>, category: 'user' },
];

const categoryLabels: Record<string, string> = {
  page: 'Pages',
  action: 'Quick Actions',
  user: 'Recent Users',
  recent: 'Recent',
};

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredCommands = useMemo(() => {
    if (!search.trim()) return allCommands;
    const query = search.toLowerCase();
    return allCommands.filter(cmd => cmd.label.toLowerCase().includes(query) || cmd.description?.toLowerCase().includes(query));
  }, [search]);

  const groupedCommands = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filteredCommands.forEach(cmd => {
      if (!groups[cmd.category]) groups[cmd.category] = [];
      groups[cmd.category].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  const flatList = useMemo(() => Object.values(groupedCommands).flat(), [groupedCommands]);

  useEffect(() => { setSelectedIndex(0); }, [search]);

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown': e.preventDefault(); setSelectedIndex(i => (i + 1) % flatList.length); break;
        case 'ArrowUp': e.preventDefault(); setSelectedIndex(i => (i - 1 + flatList.length) % flatList.length); break;
        case 'Enter': e.preventDefault(); if (flatList[selectedIndex]) { flatList[selectedIndex].action?.(); onClose(); } break;
        case 'Escape': e.preventDefault(); onClose(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, flatList, selectedIndex, onClose]);

  useEffect(() => {
    if (listRef.current) {
      const selected = listRef.current.querySelector('[data-selected="true"]');
      selected?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  let currentIndex = -1;

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998] animate-fade-in" onClick={onClose} />
      <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[12vh] px-4 pointer-events-none">
        <div className="w-full max-w-lg liquid-glass-elevated rounded-2xl overflow-hidden pointer-events-auto animate-scale-in" onClick={e => e.stopPropagation()}>
          {/* Search */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
            <Search size={18} className="text-white/40 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search commands, pages, users..."
              className="flex-1 bg-transparent text-white text-sm placeholder-white/40 outline-none"
            />
            <kbd className="hidden sm:block px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] text-white/30">ESC</kbd>
          </div>

          {/* Results */}
          <div ref={listRef} className="max-h-[360px] overflow-y-auto py-2">
            {filteredCommands.length === 0 ? (
              <div className="px-4 py-8 text-center text-white/40">
                <Search size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No results for "{search}"</p>
              </div>
            ) : (
              Object.entries(groupedCommands).map(([category, items]) => (
                <div key={category}>
                  <div className="px-4 py-2">
                    <span className="text-[9px] text-white/30 uppercase tracking-widest">{categoryLabels[category]}</span>
                  </div>
                  {items.map(item => {
                    currentIndex++;
                    const isSelected = currentIndex === selectedIndex;
                    const itemIndex = currentIndex;
                    return (
                      <button
                        key={item.id}
                        data-selected={isSelected}
                        onClick={() => { item.action?.(); onClose(); }}
                        onMouseEnter={() => setSelectedIndex(itemIndex)}
                        className={`w-full flex items-center gap-3 px-4 py-2 transition-colors ${isSelected ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'}`}
                      >
                        <span className={`shrink-0 ${isSelected ? 'text-pink-400' : 'text-white/50'}`}>{item.icon}</span>
                        <div className="flex-1 text-left min-w-0">
                          <p className={`text-sm truncate ${isSelected ? 'text-white' : 'text-white/70'}`}>{item.label}</p>
                          {item.description && <p className="text-xs text-white/30 truncate">{item.description}</p>}
                        </div>
                        {item.shortcut && (
                          <kbd className="hidden sm:block px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] text-white/30">{item.shortcut}</kbd>
                        )}
                        {isSelected && <ArrowRight size={14} className="text-pink-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.06] bg-white/[0.01]">
            <div className="flex items-center gap-3 text-[10px] text-white/30">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">↑</kbd>
                <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">↵</kbd>
                select
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-white/30">
              <Command size={10} />
              <span>K to toggle</span>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default CommandPalette;
