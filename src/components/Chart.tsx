const chartData = [
  { month: 'Jan', value: 40 },
  { month: 'Feb', value: 65 },
  { month: 'Mar', value: 45 },
  { month: 'Apr', value: 80 },
  { month: 'May', value: 55 },
  { month: 'Jun', value: 90 },
  { month: 'Jul', value: 70 },
];

const Chart = () => {
  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Revenue Overview</h3>
          <p className="text-sm text-white/40">Monthly revenue statistics</p>
        </div>
        <div className="flex gap-2">
          {['Week', 'Month', 'Year'].map((period, i) => (
            <button
              key={period}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                i === 1
                  ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-64">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[100, 75, 50, 25, 0].map((val) => (
            <div key={val} className="flex items-center gap-3">
              <span className="text-xs text-white/30 w-8 text-right">{val}%</span>
              <div className="flex-1 border-b border-white/5" />
            </div>
          ))}
        </div>

        {/* Bars */}
        <div className="absolute bottom-8 left-12 right-0 top-0 flex items-end justify-around gap-4">
          {chartData.map((data, index) => (
            <div key={data.month} className="flex flex-col items-center gap-2 flex-1">
              <div
                className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-pink-600 to-pink-400 relative group cursor-pointer transition-all duration-300 hover:from-pink-500 hover:to-pink-300"
                style={{
                  height: `${(data.value / maxValue) * 100}%`,
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl rounded-lg px-2 py-1 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ${data.value}k
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-t-lg bg-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xs text-white/40">{data.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chart;
