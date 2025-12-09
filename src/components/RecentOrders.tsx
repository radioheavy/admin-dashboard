import { MoreHorizontal, ExternalLink } from 'lucide-react';

const orders = [
  { id: '#ORD-001', customer: 'Alex Johnson', product: 'MacBook Pro 16"', amount: '$2,499', status: 'Completed', avatar: 'AJ' },
  { id: '#ORD-002', customer: 'Sarah Williams', product: 'iPhone 15 Pro', amount: '$1,199', status: 'Processing', avatar: 'SW' },
  { id: '#ORD-003', customer: 'Mike Brown', product: 'AirPods Max', amount: '$549', status: 'Pending', avatar: 'MB' },
  { id: '#ORD-004', customer: 'Emily Davis', product: 'iPad Pro 12.9"', amount: '$1,099', status: 'Completed', avatar: 'ED' },
  { id: '#ORD-005', customer: 'Chris Wilson', product: 'Apple Watch Ultra', amount: '$799', status: 'Shipped', avatar: 'CW' },
];

const statusStyles: Record<string, string> = {
  Completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Processing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Shipped: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
};

const RecentOrders = () => {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
          <p className="text-sm text-white/40">Latest transactions</p>
        </div>
        <button className="flex items-center gap-2 text-sm text-pink-400 hover:text-pink-300 transition-colors">
          View All <ExternalLink size={14} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Order</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Customer</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Product</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Amount</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Status</th>
              <th className="text-right py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                <td className="py-4 px-4">
                  <span className="text-sm font-medium text-white">{order.id}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white text-xs font-semibold">
                      {order.avatar}
                    </div>
                    <span className="text-sm text-white/80">{order.customer}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-white/60">{order.product}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm font-semibold text-white">{order.amount}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-all">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
