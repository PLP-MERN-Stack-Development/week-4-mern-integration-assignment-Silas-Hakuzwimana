import { useState, useEffect } from 'react';
import API from '../services/API';
import { toast } from 'react-toastify';

export default function EditCategory({ id, onSuccess, onCancel }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await API.get(`/categories/${id}`);
        setName(res.data.name);
      } catch {
        toast.error('Failed to load category data');
      } finally {
        setFetching(false);
      }
    }
    fetchCategory();
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Category name is required');
      return;
    }
    setLoading(true);
    try {
      await API.put(`/categories/${id}`, { name });
      toast.success('Category updated successfully');
      if (onSuccess) onSuccess();
    } catch {
      toast.error('Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p>Loading category data...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md p-4 bg-white rounded shadow space-y-4">
      <h3 className="text-xl font-semibold">Edit Category</h3>
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Saving...' : 'Save'}
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
