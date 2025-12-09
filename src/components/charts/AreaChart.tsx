import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface DataPoint {
  name: string;
  value: number;
  value2?: number;
}

interface AreaChartProps {
  data: DataPoint[];
  title?: string;
  subtitle?: string;
  color?: string;
  color2?: string;
  showGrid?: boolean;
  height?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl px-3.5 py-2.5 shadow-2xl">
        <p className="text-[10px] text-white/40 mb-1.5 uppercase tracking-wider">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color, boxShadow: `0 0 8px ${entry.color}` }}
            />
            <p className="text-sm font-semibold text-white">
              ${entry.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const AreaChartComponent = ({
  data,
  title,
  subtitle,
  color = '#ec4899',
  color2,
  showGrid = false,
  height = 300,
}: AreaChartProps) => {
  // Calculate stats
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const avg = Math.round(total / data.length);
  const lastValue = data[data.length - 1]?.value || 0;
  const prevValue = data[data.length - 2]?.value || lastValue;
  const change = prevValue > 0 ? ((lastValue - prevValue) / prevValue) * 100 : 0;
  const isPositive = change >= 0;

  return (
    <div className="group relative overflow-hidden rounded-2xl">
      {/* Background layers */}
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

      {/* Glow effect */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-30"
        style={{ backgroundColor: color }}
      />

      {/* Border */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.06]" />

      {/* Content */}
      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            {title && <h3 className="text-sm font-medium text-white/90">{title}</h3>}
            {subtitle && <p className="text-xs text-white/40 mt-0.5">{subtitle}</p>}
          </div>

          {/* Mini stats */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-white/40">Avg</p>
              <p className="text-sm font-semibold text-white">${avg.toLocaleString()}</p>
            </div>
            <div className="w-px h-8 bg-white/[0.08]" />
            <div className="text-right">
              <p className="text-xs text-white/40">Change</p>
              <div className={`flex items-center gap-1 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                <span className="text-sm font-semibold">{Math.abs(change).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={height}>
          <RechartsAreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                <stop offset="50%" stopColor={color} stopOpacity={0.1} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
              {color2 && (
                <linearGradient id={`gradient-${color2}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color2} stopOpacity={0.4} />
                  <stop offset="50%" stopColor={color2} stopOpacity={0.1} />
                  <stop offset="100%" stopColor={color2} stopOpacity={0} />
                </linearGradient>
              )}
              {/* Glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            )}
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
              tickFormatter={(value) => `$${value / 1000}k`}
              width={45}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)' }} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#gradient-${color})`}
              dot={false}
              activeDot={{
                r: 4,
                fill: color,
                stroke: '#0a0a0a',
                strokeWidth: 2,
                filter: 'url(#glow)'
              }}
            />
            {color2 && (
              <Area
                type="monotone"
                dataKey="value2"
                stroke={color2}
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#gradient-${color2})`}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: color2,
                  stroke: '#0a0a0a',
                  strokeWidth: 2,
                  filter: 'url(#glow)'
                }}
              />
            )}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaChartComponent;
