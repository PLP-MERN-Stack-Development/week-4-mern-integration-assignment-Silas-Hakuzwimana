import { useState, useEffect } from 'react';
import API from '../services/API';

export default function EditPost({ id, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: '',
    author: '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Load categories and post data
    API.get('/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Failed to fetch categories:', err));

    API.get(`/posts/${id}`)
      .then((res) => setForm({
        title: res.data.title || '',
        content: res.data.content || '',
        category: res.data.category?._id || '',
        author: res.data.author || '',
      }))
      .catch((err) => console.error('Failed to fetch post:', err));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/posts/${id}`, form);
      onSuccess();
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  return (
    <div className="border p-4 mb-6 rounded shadow bg-white max-w-xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">Edit Post</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows="5"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Author</label>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Author name (optional)"
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update Post
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
