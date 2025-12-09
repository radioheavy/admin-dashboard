import { useState, useEffect } from 'react';
import { Input, Select, Button } from '../forms';
import type { Order } from '../../data/orders';
import { products } from '../../data/products';

interface OrderFormProps {
  order?: Order | null;
  onSubmit: (data: Partial<Order>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const orderStatuses = [
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

const paymentStatuses = [
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'paid', label: 'Paid' },
  { value: 'refunded', label: 'Refunded' },
];

const paymentMethods = [
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'crypto', label: 'Cryptocurrency' },
];

const productOptions = products.slice(0, 20).map((p) => ({
  value: p.id,
  label: `${p.name} - $${p.price}`,
}));

const OrderForm = ({ order, onSubmit, onCancel, isLoading }: OrderFormProps) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    status: 'pending' as Order['status'],
    paymentStatus: 'unpaid' as Order['paymentStatus'],
    paymentMethod: 'credit_card' as Order['paymentMethod'],
    shippingAddress: '',
    selectedProducts: [] as { productId: string; quantity: number }[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (order) {
      setFormData({
        customerName: order.customer.name,
        customerEmail: order.customer.email,
        status: order.status,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        shippingAddress: order.shippingAddress,
        selectedProducts: order.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
    }
  }, [order]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Customer email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Invalid email format';
    }

    if (!formData.shippingAddress.trim()) {
      newErrors.shippingAddress = 'Shipping address is required';
    }

    if (formData.selectedProducts.length === 0) {
      newErrors.products = 'At least one product is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const items = formData.selectedProducts.map((sp) => {
        const product = products.find((p) => p.id === sp.productId);
        return {
          productId: sp.productId,
          productName: product?.name || '',
          quantity: sp.quantity,
          price: product?.price || 0,
        };
      });

      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      onSubmit({
        customer: {
          name: formData.customerName,
          email: formData.customerEmail,
          avatar: `https://i.pravatar.cc/150?u=${formData.customerEmail}`,
        },
        items,
        total,
        status: formData.status,
        paymentStatus: formData.paymentStatus,
        paymentMethod: formData.paymentMethod,
        shippingAddress: formData.shippingAddress,
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const addProduct = () => {
    setFormData((prev) => ({
      ...prev,
      selectedProducts: [...prev.selectedProducts, { productId: '', quantity: 1 }],
    }));
  };

  const removeProduct = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.filter((_, i) => i !== index),
    }));
  };

  const updateProduct = (index: number, field: 'productId' | 'quantity', value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
    if (errors.products) {
      setErrors((prev) => ({ ...prev, products: '' }));
    }
  };

  const calculateTotal = () => {
    return formData.selectedProducts.reduce((sum, sp) => {
      const product = products.find((p) => p.id === sp.productId);
      return sum + (product?.price || 0) * sp.quantity;
    }, 0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Customer Info */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-white/70">Customer Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Customer Name"
            placeholder="Enter customer name"
            value={formData.customerName}
            onChange={(e) => handleChange('customerName', e.target.value)}
            error={errors.customerName}
            required
          />
          <Input
            label="Customer Email"
            type="email"
            placeholder="Enter customer email"
            value={formData.customerEmail}
            onChange={(e) => handleChange('customerEmail', e.target.value)}
            error={errors.customerEmail}
            required
          />
        </div>
      </div>

      {/* Products */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-white/70">Products</h4>
          <button
            type="button"
            onClick={addProduct}
            className="text-sm text-pink-400 hover:text-pink-300 transition-colors"
          >
            + Add Product
          </button>
        </div>

        {errors.products && (
          <p className="text-sm text-red-400">{errors.products}</p>
        )}

        <div className="space-y-3">
          {formData.selectedProducts.map((sp, index) => (
            <div key={index} className="flex items-end gap-3 p-3 bg-white/5 rounded-xl">
              <div className="flex-1">
                <Select
                  label="Product"
                  options={productOptions}
                  value={sp.productId}
                  onChange={(e) => updateProduct(index, 'productId', e.target.value)}
                  placeholder="Select product"
                />
              </div>
              <div className="w-24">
                <Input
                  label="Qty"
                  type="number"
                  min="1"
                  value={sp.quantity.toString()}
                  onChange={(e) => updateProduct(index, 'quantity', parseInt(e.target.value) || 1)}
                />
              </div>
              <button
                type="button"
                onClick={() => removeProduct(index)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}

          {formData.selectedProducts.length === 0 && (
            <div className="text-center py-8 text-white/40 bg-white/5 rounded-xl">
              No products added. Click "Add Product" to start.
            </div>
          )}
        </div>

        {formData.selectedProducts.length > 0 && (
          <div className="flex justify-end">
            <div className="text-right">
              <p className="text-sm text-white/50">Estimated Total</p>
              <p className="text-2xl font-bold text-white">
                ${calculateTotal().toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Order Status */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-white/70">Order Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Order Status"
            options={orderStatuses}
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
          />
          <Select
            label="Payment Status"
            options={paymentStatuses}
            value={formData.paymentStatus}
            onChange={(e) => handleChange('paymentStatus', e.target.value)}
          />
          <Select
            label="Payment Method"
            options={paymentMethods}
            value={formData.paymentMethod}
            onChange={(e) => handleChange('paymentMethod', e.target.value)}
          />
        </div>
      </div>

      {/* Shipping Address */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-white/70">Shipping</h4>
        <Input
          label="Shipping Address"
          placeholder="Enter full shipping address"
          value={formData.shippingAddress}
          onChange={(e) => handleChange('shippingAddress', e.target.value)}
          error={errors.shippingAddress}
          required
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
        <Button variant="ghost" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {order ? 'Update Order' : 'Create Order'}
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
