interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'chart' | 'table';
  width?: string | number;
  height?: string | number;
  className?: string;
  count?: number;
}

const Skeleton = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
  count = 1,
}: SkeletonProps) => {
  const baseClass = 'skeleton';

  const getVariantStyles = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded';
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
        return 'rounded-xl';
      case 'card':
        return 'rounded-2xl';
      case 'chart':
        return 'rounded-2xl';
      case 'table':
        return 'rounded-xl';
      default:
        return 'rounded-xl';
    }
  };

  const style: React.CSSProperties = {
    width: width || (variant === 'circular' ? '48px' : '100%'),
    height: height || (variant === 'circular' ? '48px' : variant === 'text' ? '16px' : '100%'),
  };

  if (count > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`${baseClass} ${getVariantStyles()} ${className}`}
            style={style}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClass} ${getVariantStyles()} ${className}`}
      style={style}
    />
  );
};

// Pre-built skeleton layouts
export const StatCardSkeleton = () => (
  <div className="liquid-glass rounded-2xl p-5 space-y-4">
    <div className="flex items-start justify-between">
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={60} height={24} />
    </div>
    <div className="space-y-2">
      <Skeleton variant="text" width="60%" height={32} />
      <Skeleton variant="text" width="40%" height={12} />
    </div>
  </div>
);

export const ChartSkeleton = ({ height = 280 }: { height?: number }) => (
  <div className="liquid-glass rounded-2xl p-6 space-y-4">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton variant="text" width={120} height={20} />
        <Skeleton variant="text" width={80} height={14} />
      </div>
      <Skeleton variant="circular" width={36} height={36} />
    </div>
    <Skeleton variant="chart" height={height - 100} />
  </div>
);

export const TableRowSkeleton = () => (
  <div className="flex items-center gap-4 p-4">
    <Skeleton variant="circular" width={32} height={32} />
    <div className="flex-1 space-y-2">
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="text" width="40%" height={12} />
    </div>
    <Skeleton variant="rectangular" width={60} height={24} />
    <Skeleton variant="rectangular" width={80} height={24} />
  </div>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="liquid-glass rounded-2xl overflow-hidden">
    <div className="p-4 border-b border-white/5">
      <div className="flex items-center justify-between">
        <Skeleton variant="text" width={120} height={24} />
        <Skeleton variant="rectangular" width={160} height={36} />
      </div>
    </div>
    <div className="divide-y divide-white/5">
      {Array.from({ length: rows }).map((_, i) => (
        <TableRowSkeleton key={i} />
      ))}
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-6 animate-fade-in">
    {/* Stats Row */}
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <StatCardSkeleton />
      </div>
      <div className="col-span-6 md:col-span-3 lg:col-span-2">
        <StatCardSkeleton />
      </div>
      <div className="col-span-6 md:col-span-3 lg:col-span-2">
        <StatCardSkeleton />
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-2">
        <StatCardSkeleton />
      </div>
      <div className="col-span-12 lg:col-span-3">
        <StatCardSkeleton />
      </div>
    </div>

    {/* Charts Row */}
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-8">
        <ChartSkeleton height={320} />
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-4">
        <ChartSkeleton height={280} />
      </div>
    </div>

    {/* Tables Row */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <TableSkeleton rows={4} />
      <TableSkeleton rows={4} />
    </div>
  </div>
);

export default Skeleton;
