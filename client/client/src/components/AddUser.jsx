import UserForm from './UserForm';

export default function AddUser({ onSuccess, onCancel }) {
  return (
    <div className="bg-white shadow rounded-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Add New User</h2>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-sm px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
      <UserForm onSuccess={onSuccess} />
    </div>
  );
}
