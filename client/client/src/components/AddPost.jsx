import { useEffect, useState } from 'react';
import API from '../services/API';
import { toast, Zoom } from 'react-toastify';

export default function AddPost({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: '',
  });
  const [authorId, setAuthorId] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthorId(user.id); // 🔐 set user id
      } catch {
        console.error('Invalid user in localStorage');
      }
    }
  }, []);

  useEffect(() => {
    API.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Failed to fetch categories:', err));
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async e => {
  e.preventDefault();

  if (!authorId) {
    toast.error('You must be logged in to add a post.');
    return;
  }

  const payload = {
    ...form,
    author: authorId, // ✅ Inject author here
  };

  console.log(payload);
  
  try {
    await API.post('/posts', payload);
    toast.success('Post added successfully!');
    setForm({ title: '', content: '', category: '' });
    onSuccess?.();
  } catch (error) {
    console.error('Failed to add post:', error);
    toast.error(error.response?.data?.message || 'Failed to add post');
  }
};

  return (
    <div className="p-6 bg-white rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 bg-white rounded"
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Post
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
    </div>
  );
}
