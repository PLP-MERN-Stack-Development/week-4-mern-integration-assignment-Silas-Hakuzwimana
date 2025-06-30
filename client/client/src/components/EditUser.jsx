import { useParams } from 'react-router-dom';
import UserForm from './UserForm';

export default function EditUser() {
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit User</h2>
      <UserForm id={id} />
    </div>
  );
}
