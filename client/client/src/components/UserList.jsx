import { useEffect, useState } from 'react';
import { userService } from '../services/userService';
import AddUser from './AddUser';
import EditUser from './EditUser';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const fetchUsers = async () => {
        const data = await userService.getAll();
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (confirm('Are you sure?')) {
            await userService.remove(id);
            fetchUsers();
        }
    };

    const handleCancel = () => {
        setShowAdd(false);
        setEditingId(null);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => setShowAdd((prev) => !prev)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {showAdd ? 'Hide Form' : 'Add New User'}
                </button>
            </div>

            {showAdd && (
                <AddUser
                    onSuccess={() => {
                        fetchUsers();        // Reload table
                        setShowAdd(false);
                    }}
                    onCancel={() => setShowAdd(false)}
                />
            )}

            {editingId && (
                <EditUser id={editingId} onSuccess={fetchUsers} onCancel={handleCancel} />
            )}

            <table className="w-full mt-4 border border-collapse border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center py-4">No users found.</td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2 capitalize">{user.role}</td>
                                <td className="border px-4 py-2 space-x-2 text-center">
                                    <button
                                        onClick={() => setEditingId(user._id)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
