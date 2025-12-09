import { useState } from 'react';
import StatCard from '../components/StatCard';
import { AreaChart, BarChart, PieChart, LineChart } from '../components/charts';
import DataTable from '../components/DataTable';
import { UserModal, OrderModal, OrderDetails } from '../components/crud';
import { ConfirmDialog } from '../components/ui';
import { useToast } from '../context/ToastContext';
import { users, getRoleColor, type User } from '../data/users';
import { getStatusColor as getUserStatusColor } from '../data/users';
import { orders, type Order } from '../data/orders';
import { getStatusColor as getOrderStatusColor } from '../data/orders';
import {
  revenueData,
  weeklyRevenueData,
  salesByCategoryData,
  userGrowthData,
  dashboardStats,
} from '../data/analytics';
import { DollarSign, ShoppingBag, Users, TrendingUp, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const { showToast } = useToast();

  // User management state
  const [userList, setUserList] = useState<User[]>(users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isUserDeleteOpen, setIsUserDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Order management state
  const [orderList, setOrderList] = useState<Order[]>(orders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [isOrderDeleteOpen, setIsOrderDeleteOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  // User CRUD handlers
  const handleAddUser = () => {
    setSelectedUser(null);
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setIsUserDeleteOpen(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUserList((prev) => prev.filter((u) => u.id !== userToDelete.id));
      showToast('success', 'User deleted successfully');
      setIsUserDeleteOpen(false);
      setUserToDelete(null);
    }
  };

  const handleUserSubmit = (data: Partial<User>) => {
    if (selectedUser) {
      setUserList((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? { ...u, ...data } : u))
      );
      showToast('success', 'User updated successfully');
    } else {
      const newUser: User = {
        id: String(Date.now()),
        name: data.name || '',
        email: data.email || '',
        avatar: `https://i.pravatar.cc/150?u=${data.email}`,
        role: data.role || 'viewer',
        status: data.status || 'pending',
        department: data.department || 'Engineering',
        joinedAt: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString(),
        phone: data.phone,
        location: data.location,
      };
      setUserList((prev) => [newUser, ...prev]);
      showToast('success', 'User created successfully');
    }
    setIsUserModalOpen(false);
  };

  // Order CRUD handlers
  const handleAddOrder = () => {
    setSelectedOrder(null);
    setIsOrderModalOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  const handleDeleteOrder = (order: Order) => {
    setOrderToDelete(order);
    setIsOrderDeleteOpen(true);
  };

  const confirmDeleteOrder = () => {
    if (orderToDelete) {
      setOrderList((prev) => prev.filter((o) => o.id !== orderToDelete.id));
      showToast('success', 'Order deleted successfully');
      setIsOrderDeleteOpen(false);
      setOrderToDelete(null);
    }
  };

  const handleOrderSubmit = (data: Partial<Order>) => {
    if (selectedOrder) {
      setOrderList((prev) =>
        prev.map((o) =>
          o.id === selectedOrder.id
            ? { ...o, ...data, updatedAt: new Date().toISOString() }
            : o
        )
      );
      showToast('success', 'Order updated successfully');
    } else {
      const newOrder: Order = {
        id: String(Date.now()),
        orderNumber: `ORD-2024-${String(orderList.length + 1).padStart(3, '0')}`,
        customer: data.customer || { name: '', email: '', avatar: '' },
        items: data.items || [],
        total: data.total || 0,
        status: data.status || 'pending',
        paymentStatus: data.paymentStatus || 'unpaid',
        paymentMethod: data.paymentMethod || 'credit_card',
        shippingAddress: data.shippingAddress || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setOrderList((prev) => [newOrder, ...prev]);
      showToast('success', 'Order created successfully');
    }
    setIsOrderModalOpen(false);
  };

  // User table columns
  const userColumns = [
    {
      key: 'name',
      label: 'User',
      sortable: true,
      render: (user: User) => (
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-white/10"
          />
          <div>
            <p className="font-medium text-white">{user.name}</p>
            <p className="text-xs text-white/40">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (user: User) => (
        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getRoleColor(user.role)}`}>
          {user.role}
        </span>
      ),
    },
    {
      key: 'department',
      label: 'Department',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (user: User) => (
        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getUserStatusColor(user.status)}`}>
          {user.status}
        </span>
      ),
    },
  ];

  // Order table columns
  const orderColumns = [
    {
      key: 'orderNumber',
      label: 'Order',
      sortable: true,
      render: (order: Order) => (
        <span className="font-medium text-pink-400">{order.orderNumber}</span>
      ),
    },
    {
      key: 'customer',
      label: 'Customer',
      sortable: false,
      render: (order: Order) => (
        <div className="flex items-center gap-2">
          <img
            src={order.customer.avatar}
            alt={order.customer.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-white">{order.customer.name}</span>
        </div>
      ),
    },
    {
      key: 'total',
      label: 'Total',
      sortable: true,
      render: (order: Order) => (
        <span className="font-semibold text-white">${order.total.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (order: Order) => (
        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getOrderStatusColor(order.status)}`}>
          {order.status}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      render: (order: Order) => (
        <span className="text-white/50 text-sm">
          {new Date(order.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  // Line chart config for user growth
  const userGrowthLines = [
    { dataKey: 'users', color: '#ec4899', name: 'Total Users' },
    { dataKey: 'activeUsers', color: '#8b5cf6', name: 'Active Users' },
  ];

  return (
    <div className="space-y-6">
      {/* Bento Grid - Stats & Featured */}
      <div className="grid grid-cols-12 gap-4">
        {/* Featured Revenue Card - Larger */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 stagger-item">
          <StatCard
            title="Total Revenue"
            value={dashboardStats.totalRevenue.value}
            prefix="$"
            change={dashboardStats.totalRevenue.change}
            trend={dashboardStats.totalRevenue.trend}
            icon={<DollarSign size={20} />}
            variant="pink"
            size="large"
            sparklineData={[45, 52, 38, 65, 72, 58, 85, 78, 95, 88]}
          />
        </div>

        {/* Orders Card */}
        <div className="col-span-6 md:col-span-3 lg:col-span-2 stagger-item">
          <StatCard
            title="Orders"
            value={dashboardStats.totalOrders.value}
            change={dashboardStats.totalOrders.change}
            trend={dashboardStats.totalOrders.trend}
            icon={<ShoppingBag size={18} />}
            variant="purple"
            sparklineData={[30, 45, 35, 50, 40, 55, 45, 60, 50, 65]}
          />
        </div>

        {/* Customers Card */}
        <div className="col-span-6 md:col-span-3 lg:col-span-2 stagger-item">
          <StatCard
            title="Customers"
            value={dashboardStats.totalCustomers.value}
            change={dashboardStats.totalCustomers.change}
            trend={dashboardStats.totalCustomers.trend}
            icon={<Users size={18} />}
            variant="blue"
            sparklineData={[25, 35, 45, 40, 50, 55, 60, 65, 70, 75]}
          />
        </div>

        {/* Conversion Card with Progress */}
        <div className="col-span-12 md:col-span-6 lg:col-span-2 stagger-item">
          <StatCard
            title="Conversion"
            value={dashboardStats.conversionRate.value}
            suffix="%"
            icon={<TrendingUp size={18} />}
            variant="emerald"
            progress={dashboardStats.conversionRate.value}
          />
        </div>

        {/* Quick Actions Card */}
        <div className="col-span-12 lg:col-span-3 stagger-item">
          <div className="group relative overflow-hidden rounded-2xl p-5 h-full gradient-border">
            {/* Glass background */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent backdrop-blur-xl" />
            <div className="absolute inset-0 rounded-2xl border border-white/[0.08]" />
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-pink-400" />
                <span className="text-xs text-white/40 uppercase tracking-wider font-medium">AI Insights</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Revenue is <span className="text-emerald-400 font-medium">up 12%</span> this week.
                Consider running a promotion on <span className="text-pink-400 font-medium">Electronics</span> category.
              </p>
              <button className="mt-4 text-xs text-pink-400 hover:text-pink-300 font-medium transition-colors hover-underline">
                View Analysis →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row - Bento Style */}
      <div className="grid grid-cols-12 gap-4">
        {/* Main Revenue Chart - Wide */}
        <div className="col-span-12 lg:col-span-8 stagger-item card-lift">
          <AreaChart
            data={revenueData}
            title="Revenue Overview"
            subtitle="Monthly revenue trend"
            color="#ec4899"
            color2="#8b5cf6"
            height={320}
          />
        </div>

        {/* Pie Chart - Tall */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 stagger-item card-lift">
          <PieChart
            data={salesByCategoryData}
            title="Sales by Category"
            subtitle="Distribution"
            height={280}
          />
        </div>
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-12 gap-4">
        {/* Bar Chart */}
        <div className="col-span-12 md:col-span-6 lg:col-span-5 stagger-item card-lift">
          <BarChart
            data={weeklyRevenueData}
            title="Weekly Performance"
            subtitle="This week's daily revenue"
            height={280}
          />
        </div>

        {/* Line Chart */}
        <div className="col-span-12 md:col-span-6 lg:col-span-7 stagger-item card-lift">
          <LineChart
            data={userGrowthData}
            lines={userGrowthLines}
            title="User Growth"
            subtitle="Total vs Active users over time"
            height={280}
            showLegend
          />
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Users Table */}
        <div className="stagger-item card-lift">
          <DataTable
            data={userList}
            columns={userColumns}
            title="Team Members"
            searchPlaceholder="Search users..."
            onAdd={handleAddUser}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        </div>

        {/* Orders Table */}
        <div className="stagger-item card-lift">
          <DataTable
            data={orderList}
            columns={orderColumns}
            title="Recent Orders"
            searchPlaceholder="Search orders..."
            onAdd={handleAddOrder}
            onEdit={handleEditOrder}
            onDelete={handleDeleteOrder}
            onView={handleViewOrder}
          />
        </div>
      </div>

      {/* Modals */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        user={selectedUser}
        onSubmit={handleUserSubmit}
      />

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        order={selectedOrder}
        onSubmit={handleOrderSubmit}
      />

      <OrderDetails
        isOpen={isOrderDetailsOpen}
        onClose={() => setIsOrderDetailsOpen(false)}
        order={selectedOrder}
        onEdit={() => {
          setIsOrderDetailsOpen(false);
          setIsOrderModalOpen(true);
        }}
      />

      <ConfirmDialog
        isOpen={isUserDeleteOpen}
        onClose={() => setIsUserDeleteOpen(false)}
        onConfirm={confirmDeleteUser}
        title="Delete User"
        message={`Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone.`}
        variant="danger"
      />

      <ConfirmDialog
        isOpen={isOrderDeleteOpen}
        onClose={() => setIsOrderDeleteOpen(false)}
        onConfirm={confirmDeleteOrder}
        title="Delete Order"
        message={`Are you sure you want to delete order ${orderToDelete?.orderNumber}? This action cannot be undone.`}
        variant="danger"
      />
    </div>
  );
};

export default Dashboard;
