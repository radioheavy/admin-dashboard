import { useState, useEffect } from 'react';
import { Search, Command, Menu } from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';
import CommandPalette from './CommandPalette';
import NotificationsDropdown from './NotificationsDropdown';
import QuickActions from './QuickActions';
import UserMenu from './UserMenu';
import Breadcrumbs from './Breadcrumbs';

const Header = () => {
  const { toggleMobile } = useSidebar();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="h-14 liquid-glass border-b border-white/[0.06] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20">
        {/* Left side */}
        <div className="flex items-center gap-3 flex-1">
          {/* Mobile menu button */}
          <button
            onClick={toggleMobile}
            className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-white/[0.06] text-white/50 hover:text-white transition-all"
          >
            <Menu size={20} />
          </button>

          {/* Breadcrumbs - Desktop only */}
          <div className="hidden md:block">
            <Breadcrumbs items={[{ label: 'Dashboard' }]} />
          </div>

          {/* Search Button */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="
              flex items-center gap-3 px-3 py-1.5 rounded-xl
              bg-white/[0.03] border border-white/[0.06]
              hover:bg-white/[0.06] hover:border-white/[0.1]
              transition-all ml-auto lg:ml-4 group
            "
          >
            <Search size={15} className="text-white/40 group-hover:text-white/60" />
            <span className="text-sm text-white/40 group-hover:text-white/60 hidden sm:inline">
              Search...
            </span>
            <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] ml-4">
              <Command size={11} className="text-white/30" />
              <span className="text-[11px] text-white/30 font-medium">K</span>
            </div>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 ml-4">
          {/* Quick Actions */}
          <div className="hidden sm:block">
            <QuickActions />
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-6 bg-white/[0.06] mx-2" />

          {/* Notifications */}
          <NotificationsDropdown />

          {/* User Menu */}
          <UserMenu />
        </div>
      </header>

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </>
  );
};

export default Header;
