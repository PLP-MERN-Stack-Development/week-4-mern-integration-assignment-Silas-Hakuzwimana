import UserForm from './UserForm';

export default function EditUser({ id, onSuccess, onCancel }) {
  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit User</h2>
      <UserForm id={id} onSuccess={onSuccess} onCancel={onCancel} />
    </div>
  );
}
