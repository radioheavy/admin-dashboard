import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

interface DataPoint {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface PieChartProps {
  data: DataPoint[];
  title?: string;
  subtitle?: string;
  height?: number;
  showLegend?: boolean;
  innerRadius?: number;
  outerRadius?: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl px-3.5 py-2.5 shadow-2xl">
        <div className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: payload[0].payload.color, boxShadow: `0 0 8px ${payload[0].payload.color}` }}
          />
          <span className="text-sm font-semibold text-white">
            {payload[0].name}: {payload[0].value}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const PieChartComponent = ({
  data,
  title,
  subtitle,
  height = 300,
  showLegend = true,
  innerRadius = 55,
  outerRadius = 85,
}: PieChartProps) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="group relative overflow-hidden rounded-2xl h-full">
      {/* Background layers */}
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

      {/* Multi-color glow */}
      {data.slice(0, 2).map((item, i) => (
        <div
          key={i}
          className="absolute w-32 h-32 rounded-full opacity-10 blur-3xl"
          style={{
            backgroundColor: item.color,
            top: i === 0 ? '-20%' : '60%',
            left: i === 0 ? '60%' : '-10%',
          }}
        />
      ))}

      {/* Border */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.06]" />

      {/* Content */}
      <div className="relative p-5 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
            <PieChartIcon size={18} className="text-pink-400" />
          </div>
          <div>
            {title && <h3 className="text-sm font-medium text-white/90">{title}</h3>}
            {subtitle && <p className="text-xs text-white/40 mt-0.5">{subtitle}</p>}
          </div>
        </div>

        {/* Chart and Legend */}
        <div className="flex-1 flex items-center gap-4">
          {/* Pie Chart */}
          <div className="relative" style={{ width: '55%' }}>
            <ResponsiveContainer width="100%" height={height}>
              <RechartsPieChart>
                <defs>
                  {data.map((_, index) => (
                    <filter key={index} id={`glow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  ))}
                </defs>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={innerRadius}
                  outerRadius={outerRadius}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      style={{ filter: `drop-shadow(0 0 6px ${entry.color}50)` }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </RechartsPieChart>
            </ResponsiveContainer>

            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{total}%</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Total</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          {showLegend && (
            <div className="flex-1 space-y-2.5">
              {data.map((item, index) => (
                <div key={index} className="group/item flex items-center gap-2.5 cursor-default">
                  <div
                    className="w-2.5 h-2.5 rounded-full transition-transform group-hover/item:scale-125"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}50` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/60 truncate">{item.name}</p>
                    <p className="text-sm font-semibold text-white">{item.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;
