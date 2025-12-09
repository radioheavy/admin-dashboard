import { useState, useEffect } from 'react';
import { Input, Select, Button } from '../forms';
import type { User } from '../../data/users';

interface UserFormProps {
  user?: User | null;
  onSubmit: (data: Partial<User>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
  { value: 'moderator', label: 'Moderator' },
];

const statuses = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
];

const departments = [
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Support', label: 'Support' },
  { value: 'HR', label: 'HR' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Design', label: 'Design' },
  { value: 'Content', label: 'Content' },
  { value: 'Operations', label: 'Operations' },
  { value: 'Legal', label: 'Legal' },
];

const UserForm = ({ user, onSubmit, onCancel, isLoading }: UserFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'viewer' as User['role'],
    status: 'active' as User['status'],
    department: 'Engineering',
    phone: '',
    location: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        department: user.department,
        phone: user.phone || '',
        location: user.location || '',
      });
    }
  }, [user]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.phone && !/^[+]?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Full Name"
          placeholder="Enter full name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Select
          label="Role"
          options={roles}
          value={formData.role}
          onChange={(e) => handleChange('role', e.target.value)}
        />

        <Select
          label="Status"
          options={statuses}
          value={formData.status}
          onChange={(e) => handleChange('status', e.target.value)}
        />
      </div>

      <Select
        label="Department"
        options={departments}
        value={formData.department}
        onChange={(e) => handleChange('department', e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 234 567 8900"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          error={errors.phone}
        />

        <Input
          label="Location"
          placeholder="City, State"
          value={formData.location}
          onChange={(e) => handleChange('location', e.target.value)}
        />
      </div>

      {/* Avatar Preview */}
      <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
        <img
          src={user?.avatar || `https://i.pravatar.cc/150?u=${formData.email || 'new'}`}
          alt="Avatar"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <p className="text-sm text-white/70">Profile Picture</p>
          <p className="text-xs text-white/40">
            Avatar is automatically generated based on email
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
        <Button variant="ghost" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {user ? 'Update User' : 'Create User'}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
