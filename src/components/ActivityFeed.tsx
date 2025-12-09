import { UserPlus, ShoppingBag, CreditCard, Star, MessageSquare } from 'lucide-react';

const activities = [
  {
    icon: <UserPlus size={16} />,
    title: 'New user registered',
    description: 'John Doe created an account',
    time: '2 min ago',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: <ShoppingBag size={16} />,
    title: 'New order placed',
    description: 'Order #ORD-006 worth $1,299',
    time: '15 min ago',
    color: 'from-pink-500 to-pink-600',
  },
  {
    icon: <CreditCard size={16} />,
    title: 'Payment received',
    description: '$2,499 from Alex Johnson',
    time: '1 hour ago',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: <Star size={16} />,
    title: 'New review',
    description: '5-star rating from Emily',
    time: '2 hours ago',
    color: 'from-amber-500 to-amber-600',
  },
  {
    icon: <MessageSquare size={16} />,
    title: 'Support ticket',
    description: 'Ticket #1234 resolved',
    time: '3 hours ago',
    color: 'from-purple-500 to-purple-600',
  },
];

const ActivityFeed = () => {
  return (
    <div className="glass-card rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Activity Feed</h3>
          <p className="text-sm text-white/40">Recent activities</p>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/[0.02] transition-colors group"
          >
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${activity.color} text-white shrink-0`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{activity.title}</p>
              <p className="text-xs text-white/50 truncate">{activity.description}</p>
            </div>
            <span className="text-xs text-white/30 whitespace-nowrap">{activity.time}</span>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2.5 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white hover:bg-white/5 hover:border-pink-500/30 transition-all">
        View All Activity
      </button>
    </div>
  );
};

export default ActivityFeed;
