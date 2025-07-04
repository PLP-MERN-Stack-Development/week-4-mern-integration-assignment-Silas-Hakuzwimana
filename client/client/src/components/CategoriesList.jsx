import { useState, useEffect } from 'react';
import API from '../services/API';  // adjust the path if needed
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await API.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const reloadCategories = () => {
    fetchCategories();
    setAdding(false);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await API.delete(`/categories/${id}`);
      reloadCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Category Management</h2>

      <button
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => setAdding(true)}
      >
        Add Category
      </button>

      {adding && <AddCategory onSuccess={reloadCategories} onCancel={() => setAdding(false)} />}
      {editingId && (
        <EditCategory
          id={editingId}
          onSuccess={reloadCategories}
          onCancel={() => setEditingId(null)}
        />
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 && (
            <tr>
              <td colSpan={2} className="text-center py-4">
                No categories found.
              </td>
            </tr>
          )}
          {categories.map((cat) => (
            <tr key={cat._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{cat.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => setEditingId(cat._id)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => handleDelete(cat._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
