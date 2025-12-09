import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  FolderOpen,
  Bell,
  Wallet,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  X,
  User,
  Moon,
  Globe,
} from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';
import Tooltip from './Tooltip';

interface SubMenuItem {
  label: string;
  icon?: React.ReactNode;
  badge?: number;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  collapsed?: boolean;
  subItems?: SubMenuItem[];
}

const NavItem = ({ icon, label, active, badge, collapsed, subItems }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubItems = subItems && subItems.length > 0;

  return (
    <div>
      <Tooltip content={label} disabled={!collapsed}>
        <button
          onClick={() => hasSubItems && setIsOpen(!isOpen)}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
            transition-all duration-200 group relative
            ${active
              ? 'bg-white/[0.08] text-white'
              : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
            }
            ${collapsed ? 'justify-center' : ''}
          `}
        >
          {/* Active indicator */}
          {active && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-pink-500 rounded-r-full" />
          )}

          {/* Icon */}
          <span className={`shrink-0 transition-colors duration-200 ${active ? 'text-pink-400' : ''}`}>
            {icon}
          </span>

          {/* Label */}
          {!collapsed && (
            <>
              <span className="text-sm flex-1 text-left truncate">{label}</span>

              {/* Badge */}
              {badge && !hasSubItems && (
                <span className="px-1.5 py-0.5 rounded-md bg-pink-500/20 text-pink-400 text-[10px] font-medium">
                  {badge}
                </span>
              )}

              {/* Submenu arrow */}
              {hasSubItems && (
                <ChevronDown
                  size={14}
                  className={`text-white/30 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              )}
            </>
          )}

          {/* Collapsed badge dot */}
          {collapsed && badge && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-pink-500 rounded-full" />
          )}
        </button>
      </Tooltip>

      {/* Submenu */}
      {hasSubItems && !collapsed && (
        <div
          className={`
            overflow-hidden transition-all duration-200 ease-out
            ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="pl-4 pr-2 py-1 space-y-0.5">
            {subItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/[0.03] transition-all duration-200"
              >
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-sm flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] text-white/30">{item.badge}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const UserDropdown = ({ collapsed }: { collapsed: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full rounded-xl p-2.5
          bg-white/[0.03] hover:bg-white/[0.06]
          border border-white/[0.06]
          flex items-center gap-3 transition-all duration-200
          ${collapsed ? 'justify-center' : ''}
        `}
      >
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-semibold text-xs">
            IO
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0a0a0a]" />
        </div>

        {!collapsed && (
          <>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-white truncate">Ismail Oktay</p>
              <p className="text-[11px] text-white/40 truncate">Administrator</p>
            </div>
            <ChevronRight
              size={14}
              className={`text-white/30 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
            />
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && !collapsed && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-full left-0 right-0 mb-2 z-50 liquid-glass-elevated rounded-xl overflow-hidden animate-slide-in-from-bottom">
            <div className="p-1.5">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all">
                <User size={16} />
                <span className="text-sm">Profile</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all">
                <Settings size={16} />
                <span className="text-sm">Settings</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all">
                <Moon size={16} />
                <span className="text-sm">Appearance</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all">
                <Globe size={16} />
                <span className="text-sm">Language</span>
              </button>
            </div>
            <div className="liquid-divider mx-2" />
            <div className="p-1.5">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all">
                <LogOut size={16} />
                <span className="text-sm">Log out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Sidebar = () => {
  const { isCollapsed, isMobileOpen, toggleCollapse, closeMobile } = useSidebar();

  const sidebarContent = (
    <>
      {/* Header */}
      <div className={`p-4 ${isCollapsed ? 'px-3' : ''}`}>
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>

          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <h1 className="font-semibold text-white text-base tracking-tight">Nexus</h1>
              <p className="text-[10px] text-white/30 uppercase tracking-wider">Admin</p>
            </div>
          )}

          {/* Collapse button - Desktop only */}
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white transition-all"
          >
            <ChevronLeft
              size={16}
              className={`transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Close button - Mobile only */}
          <button
            onClick={closeMobile}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white transition-all"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="liquid-divider mx-4" />

      {/* Navigation */}
      <nav className={`flex-1 p-3 space-y-0.5 overflow-y-auto ${isCollapsed ? 'px-2' : ''}`}>
        {!isCollapsed && (
          <p className="text-[10px] text-white/30 uppercase tracking-widest px-3 mb-2 mt-1">
            Menu
          </p>
        )}

        <NavItem
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          active
          collapsed={isCollapsed}
        />
        <NavItem
          icon={<BarChart3 size={18} />}
          label="Analytics"
          collapsed={isCollapsed}
          subItems={[
            { label: 'Overview' },
            { label: 'Reports' },
            { label: 'Real-time' },
          ]}
        />
        <NavItem
          icon={<Users size={18} />}
          label="Users"
          badge={12}
          collapsed={isCollapsed}
          subItems={[
            { label: 'All Users', badge: 2453 },
            { label: 'Roles' },
            { label: 'Permissions' },
          ]}
        />
        <NavItem
          icon={<ShoppingCart size={18} />}
          label="Orders"
          badge={3}
          collapsed={isCollapsed}
          subItems={[
            { label: 'All Orders', badge: 1234 },
            { label: 'Returns', badge: 8 },
            { label: 'Refunds', badge: 3 },
          ]}
        />
        <NavItem
          icon={<Wallet size={18} />}
          label="Transactions"
          collapsed={isCollapsed}
        />
        <NavItem
          icon={<FolderOpen size={18} />}
          label="Projects"
          collapsed={isCollapsed}
        />

        {!isCollapsed && (
          <p className="text-[10px] text-white/30 uppercase tracking-widest px-3 mt-6 mb-2">
            System
          </p>
        )}
        {isCollapsed && <div className="h-4" />}

        <NavItem
          icon={<Bell size={18} />}
          label="Notifications"
          badge={5}
          collapsed={isCollapsed}
        />
        <NavItem
          icon={<Settings size={18} />}
          label="Settings"
          collapsed={isCollapsed}
          subItems={[
            { label: 'General' },
            { label: 'Security' },
            { label: 'Billing' },
            { label: 'API Keys' },
          ]}
        />
        <NavItem
          icon={<HelpCircle size={18} />}
          label="Help Center"
          collapsed={isCollapsed}
        />
      </nav>

      <div className="liquid-divider mx-4" />

      {/* User Profile */}
      <div className={`p-3 ${isCollapsed ? 'px-2' : ''}`}>
        <UserDropdown collapsed={isCollapsed} />
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen z-40
          hidden lg:flex flex-col
          liquid-glass border-r border-white/[0.06]
          transition-all duration-300 ease-out
          ${isCollapsed ? 'w-[68px]' : 'w-60'}
        `}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      <div
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]
          lg:hidden transition-opacity duration-300
          ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={closeMobile}
      />

      {/* Mobile Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen w-72 z-[70]
          lg:hidden flex flex-col
          liquid-glass-elevated border-r border-white/[0.08]
          transition-transform duration-300 ease-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
