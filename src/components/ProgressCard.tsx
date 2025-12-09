interface ProgressCardProps {
  title: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}

const ProgressCard = ({ title, current, target, unit, color }: ProgressCardProps) => {
  const percentage = Math.round((current / target) * 100);

  return (
    <div className="glass-card rounded-2xl p-5 hover:glow-pink transition-all duration-500">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-white/70">{title}</h4>
        <span className="text-xs text-white/40">{percentage}%</span>
      </div>

      <div className="flex items-end gap-2 mb-3">
        <span className="text-2xl font-bold text-white">{current.toLocaleString()}</span>
        <span className="text-sm text-white/40 mb-1">/ {target.toLocaleString()} {unit}</span>
      </div>

      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressCard;
