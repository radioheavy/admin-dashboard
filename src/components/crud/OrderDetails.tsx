import { Drawer } from '../ui';
import type { Order } from '../../data/orders';
import { getStatusColor, getPaymentStatusColor, getPaymentMethodIcon } from '../../data/orders';

interface OrderDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onEdit?: () => void;
}

const OrderDetails = ({ isOpen, onClose, order, onEdit }: OrderDetailsProps) => {
  if (!order) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={`Order ${order.orderNumber}`} side="right">
      <div className="space-y-6">
        {/* Status Badges */}
        <div className="flex flex-wrap gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
          </span>
        </div>

        {/* Customer Info */}
        <div className="p-4 bg-white/5 rounded-xl space-y-3">
          <h4 className="text-sm font-medium text-white/50">Customer</h4>
          <div className="flex items-center gap-3">
            <img
              src={order.customer.avatar}
              alt={order.customer.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-white">{order.customer.name}</p>
              <p className="text-sm text-white/50">{order.customer.email}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white/50">Order Items</h4>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
              >
                <div>
                  <p className="font-medium text-white">{item.productName}</p>
                  <p className="text-sm text-white/50">
                    ${item.price.toLocaleString()} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-white">
                  ${(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between p-4 bg-pink-500/10 rounded-xl border border-pink-500/20">
            <p className="font-medium text-white/70">Total</p>
            <p className="text-2xl font-bold text-white">
              ${order.total.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Payment Info */}
        <div className="p-4 bg-white/5 rounded-xl space-y-3">
          <h4 className="text-sm font-medium text-white/50">Payment</h4>
          <div className="flex items-center gap-2">
            <span className="text-xl">{getPaymentMethodIcon(order.paymentMethod)}</span>
            <span className="text-white capitalize">
              {order.paymentMethod.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="p-4 bg-white/5 rounded-xl space-y-3">
          <h4 className="text-sm font-medium text-white/50">Shipping Address</h4>
          <p className="text-white">{order.shippingAddress}</p>
        </div>

        {/* Timeline */}
        <div className="p-4 bg-white/5 rounded-xl space-y-3">
          <h4 className="text-sm font-medium text-white/50">Timeline</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Created</span>
              <span className="text-white">{formatDate(order.createdAt)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Last Updated</span>
              <span className="text-white">{formatDate(order.updatedAt)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onEdit}
            className="flex-1 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors"
          >
            Edit Order
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default OrderDetails;
