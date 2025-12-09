import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="flex items-center gap-1 text-sm">
      {/* Home */}
      <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-all">
        <Home size={16} />
      </button>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <ChevronRight size={14} className="text-white/20" />
          {index === items.length - 1 ? (
            <span className="px-2 py-1 text-white font-medium">{item.label}</span>
          ) : (
            <button className="px-2 py-1 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-all">
              {item.label}
            </button>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
