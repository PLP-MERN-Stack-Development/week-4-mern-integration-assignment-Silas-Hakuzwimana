import { useState } from 'react';
import API from '../services/API';
import { toast } from 'react-toastify';

export default function AddCategory({ onSuccess, onCancel }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Category name is required');
      return;
    }
    setLoading(true);
    try {
      await API.post('/categories', { name });
      toast.success('Category added successfully');
      setName('');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md p-4 bg-white rounded shadow space-y-4">
      <h3 className="text-xl font-semibold">Add New Category</h3>
      <input
        type="text"
        placeholder="Category name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
