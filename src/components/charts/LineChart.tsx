import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Activity } from 'lucide-react';

interface DataPoint {
  name: string;
  [key: string]: string | number;
}

interface LineConfig {
  dataKey: string;
  color: string;
  name?: string;
}

interface LineChartProps {
  data: DataPoint[];
  lines: LineConfig[];
  title?: string;
  subtitle?: string;
  showGrid?: boolean;
  height?: number;
  showLegend?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl px-3.5 py-2.5 shadow-2xl">
        <p className="text-[10px] text-white/40 mb-2 uppercase tracking-wider">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color, boxShadow: `0 0 8px ${entry.color}` }}
              />
              <span className="text-xs text-white/50">{entry.name}:</span>
              <span className="text-sm font-semibold text-white">{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex items-center justify-center gap-6 mt-4">
      {payload?.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color, boxShadow: `0 0 8px ${entry.color}50` }}
          />
          <span className="text-xs text-white/50">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const LineChartComponent = ({
  data,
  lines,
  title,
  subtitle,
  showGrid = false,
  height = 300,
  showLegend = false,
}: LineChartProps) => {
  // Get latest values for each line
  const latestData = data[data.length - 1] || {};

  return (
    <div className="group relative overflow-hidden rounded-2xl h-full">
      {/* Background layers */}
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

      {/* Glow effects */}
      {lines.slice(0, 2).map((line, i) => (
        <div
          key={i}
          className="absolute w-40 h-40 rounded-full opacity-15 blur-3xl transition-opacity group-hover:opacity-20"
          style={{
            backgroundColor: line.color,
            top: i === 0 ? '-30%' : '50%',
            right: i === 0 ? '-10%' : '70%',
          }}
        />
      ))}

      {/* Border */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.06]" />

      {/* Content */}
      <div className="relative p-5 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
              <Activity size={18} className="text-pink-400" />
            </div>
            <div>
              {title && <h3 className="text-sm font-medium text-white/90">{title}</h3>}
              {subtitle && <p className="text-xs text-white/40 mt-0.5">{subtitle}</p>}
            </div>
          </div>

          {/* Current values */}
          <div className="flex items-center gap-4">
            {lines.map((line, index) => (
              <div key={index} className="text-right">
                <p className="text-[10px] text-white/40 uppercase tracking-wider">{line.name || line.dataKey}</p>
                <p className="text-sm font-semibold" style={{ color: line.color }}>
                  {(latestData[line.dataKey] as number || 0).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={height}>
            <RechartsLineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                {lines.map((line, index) => (
                  <linearGradient key={index} id={`lineGradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={line.color} stopOpacity={0.3} />
                    <stop offset="50%" stopColor={line.color} stopOpacity={1} />
                    <stop offset="100%" stopColor={line.color} stopOpacity={0.3} />
                  </linearGradient>
                ))}
                <filter id="lineGlow">
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
                width={45}
              />
              <Tooltip content={<CustomTooltip />} />
              {showLegend && <Legend content={<CustomLegend />} />}
              {lines.map((line, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={line.dataKey}
                  name={line.name || line.dataKey}
                  stroke={line.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: line.color,
                    stroke: '#0a0a0a',
                    strokeWidth: 2,
                    style: { filter: 'url(#lineGlow)' }
                  }}
                />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LineChartComponent;
