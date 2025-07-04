import { useEffect, useState } from 'react';
import API from '../services/API';
import { Link } from 'react-router-dom';

export default function UserList() {
  const [users, setUsers] = useState([]);

  const apiUsers = "http://localhost:5000/api/auth/users";
  const apiEditUsers = "http://localhost:5000/api/auth/users";
  const fetchUsers = async () => {
    const res = await API.get(apiUsers);
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    if (window.confirm('Delete user?')) {
      await API.delete(apiEditUsers+`/${id}`);
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/add"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add User
        </Link>
      </div>

      <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{u.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{u.email}</td>
                <td className="px-6 py-4 text-sm text-gray-800 capitalize">{u.role}</td>
                <td className="px-6 py-4 space-x-2">
                  <Link
                    to={`/edit/${u._id}`}
                    className="inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="inline-block bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
