import { useRef, useState, useEffect, type ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change?: number;
  trend?: 'up' | 'down';
  icon?: ReactNode;
  variant?: 'pink' | 'purple' | 'blue' | 'emerald';
  sparklineData?: number[];
  progress?: number;
  size?: 'default' | 'large';
}

const variantConfig = {
  pink: {
    gradient: 'from-pink-500 to-rose-500',
    glow: 'rgba(236, 72, 153, 0.35)',
    ring: '#ec4899',
    bg: 'rgba(236, 72, 153, 0.1)',
    text: 'text-pink-400',
  },
  purple: {
    gradient: 'from-violet-500 to-purple-500',
    glow: 'rgba(139, 92, 246, 0.35)',
    ring: '#8b5cf6',
    bg: 'rgba(139, 92, 246, 0.1)',
    text: 'text-violet-400',
  },
  blue: {
    gradient: 'from-blue-500 to-cyan-500',
    glow: 'rgba(59, 130, 246, 0.35)',
    ring: '#3b82f6',
    bg: 'rgba(59, 130, 246, 0.1)',
    text: 'text-blue-400',
  },
  emerald: {
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16, 185, 129, 0.35)',
    ring: '#10b981',
    bg: 'rgba(16, 185, 129, 0.1)',
    text: 'text-emerald-400',
  },
};

// Mini sparkline component
const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 80 - 10;
      return `${x},${y}`;
    })
    .join(' ');

  const id = `spark-${color.replace('#', '')}`;

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,100 ${points} 100,100`}
        fill={`url(#${id})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        opacity="0.6"
      />
    </svg>
  );
};

// Animated counter hook
const useAnimatedCounter = (value: number, duration = 1200) => {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const startTime = performance.now();
    const startValue = count;

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(startValue + (value - startValue) * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value, duration]);

  return count;
};

// Progress ring component
const ProgressRing = ({ progress, color, size = 48 }: { progress: number; color: string; size?: number }) => {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-1000 ease-out"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  );
};

const StatCard = ({
  title,
  value,
  prefix = '',
  suffix = '',
  change,
  trend,
  icon,
  variant = 'pink',
  sparklineData,
  progress,
  size = 'default',
}: StatCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const config = variantConfig[variant];
  const animatedValue = useAnimatedCounter(value);

  // 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 8, y: -x * 8 });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Generate random sparkline if not provided
  const sparkData = sparklineData || Array.from({ length: 10 }, (_, i) => 50 + Math.sin(i * 0.8) * 30 + Math.random() * 20);

  const isLarge = size === 'large';

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-2xl cursor-default ${isLarge ? 'p-6' : 'p-5'}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
    >
      {/* Glass background */}
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-2xl" />

      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${config.bg}, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Border glow */}
      <div
        className="absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${config.glow}, transparent, ${config.glow})`,
          opacity: isHovered ? 0.5 : 0,
        }}
      />

      {/* Inner border */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.06] group-hover:border-white/[0.1] transition-colors" />

      {/* Top edge shine */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Sparkline background */}
      <div className="absolute bottom-0 left-0 right-0 h-20 opacity-40 pointer-events-none">
        <Sparkline data={sparkData} color={config.ring} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          <div
            className={`${isLarge ? 'w-12 h-12' : 'w-10 h-10'} rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
            style={{
              background: config.bg,
              boxShadow: isHovered ? `0 0 24px ${config.glow}` : 'none',
            }}
          >
            <span className={config.text}>{icon}</span>
          </div>

          {/* Progress ring or change badge */}
          {progress !== undefined ? (
            <div className="relative">
              <ProgressRing progress={progress} color={config.ring} size={isLarge ? 52 : 46} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[11px] font-bold text-white">{progress}%</span>
              </div>
            </div>
          ) : change !== undefined && trend && (
            <div
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border ${
                trend === 'up'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}
            >
              {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {Math.abs(change)}%
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mb-1">
          <span
            className={`${isLarge ? 'text-4xl' : 'text-3xl'} font-bold text-white tracking-tight`}
            style={{
              textShadow: isHovered ? `0 0 30px ${config.glow}` : 'none',
              transition: 'text-shadow 0.3s ease',
            }}
          >
            {prefix}{formatNumber(animatedValue)}{suffix}
          </span>
        </div>

        {/* Title */}
        <p className="text-xs text-white/40 uppercase tracking-widest font-medium">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
