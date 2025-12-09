import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { BarChart3 } from 'lucide-react';

interface DataPoint {
  name: string;
  value: number;
}

interface BarChartProps {
  data: DataPoint[];
  title?: string;
  subtitle?: string;
  color?: string;
  showGrid?: boolean;
  height?: number;
  gradient?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl px-3.5 py-2.5 shadow-2xl">
        <p className="text-[10px] text-white/40 mb-1 uppercase tracking-wider">{label}</p>
        <p className="text-base font-semibold text-white">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const BarChartComponent = ({
  data,
  title,
  subtitle,
  color = '#ec4899',
  showGrid = false,
  height = 300,
}: BarChartProps) => {
  // Find max value for highlighting
  const maxValue = Math.max(...data.map(d => d.value));
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="group relative overflow-hidden rounded-2xl">
      {/* Background layers */}
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

      {/* Glow effect */}
      <div
        className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full opacity-15 blur-3xl transition-opacity group-hover:opacity-25"
        style={{ backgroundColor: color }}
      />

      {/* Border */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.06]" />

      {/* Content */}
      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color}15` }}
            >
              <BarChart3 size={18} style={{ color }} />
            </div>
            <div>
              {title && <h3 className="text-sm font-medium text-white/90">{title}</h3>}
              {subtitle && <p className="text-xs text-white/40 mt-0.5">{subtitle}</p>}
            </div>
          </div>

          {/* Total */}
          <div className="text-right">
            <p className="text-xs text-white/40">Total</p>
            <p className="text-lg font-semibold text-white">${total.toLocaleString()}</p>
          </div>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={height}>
          <RechartsBarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="barGradientPremium" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={1} />
                <stop offset="100%" stopColor={color} stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="barGradientMuted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.5} />
                <stop offset="100%" stopColor={color} stopOpacity={0.2} />
              </linearGradient>
              {/* Glow filter for bars */}
              <filter id="barGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
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
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.value === maxValue ? 'url(#barGradientPremium)' : 'url(#barGradientMuted)'}
                  style={entry.value === maxValue ? { filter: 'url(#barGlow)' } : {}}
                />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>

        {/* Bottom legend - days indicator */}
        <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-white/30">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: `linear-gradient(180deg, ${color}, ${color}99)` }} />
            <span>Best day</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: `linear-gradient(180deg, ${color}80, ${color}33)` }} />
            <span>Regular</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChartComponent;
