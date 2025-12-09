import { Modal } from '../ui';
import UserForm from './UserForm';
import type { User } from '../../data/users';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null;
  onSubmit: (data: Partial<User>) => void;
  isLoading?: boolean;
}

const UserModal = ({ isOpen, onClose, user, onSubmit, isLoading }: UserModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={user ? 'Edit User' : 'Add New User'}
      size="lg"
    >
      <UserForm
        user={user}
        onSubmit={onSubmit}
        onCancel={onClose}
        isLoading={isLoading}
      />
    </Modal>
  );
};

export default UserModal;
