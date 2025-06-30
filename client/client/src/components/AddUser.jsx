import UserForm from './UserForm';

export default function AddUser() {
  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New User</h2>
      <UserForm />
    </div>
  );
}
