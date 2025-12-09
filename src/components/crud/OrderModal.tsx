import { Modal } from '../ui';
import OrderForm from './OrderForm';
import type { Order } from '../../data/orders';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order?: Order | null;
  onSubmit: (data: Partial<Order>) => void;
  isLoading?: boolean;
}

const OrderModal = ({ isOpen, onClose, order, onSubmit, isLoading }: OrderModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={order ? 'Edit Order' : 'Create New Order'}
      size="xl"
    >
      <OrderForm
        order={order}
        onSubmit={onSubmit}
        onCancel={onClose}
        isLoading={isLoading}
      />
    </Modal>
  );
};

export default OrderModal;
