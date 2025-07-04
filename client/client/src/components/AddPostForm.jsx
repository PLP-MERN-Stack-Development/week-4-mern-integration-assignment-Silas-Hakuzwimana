import { useState } from 'react';
import { postService } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function AddPostForm() {
  const [form, setForm] = useState({ title: '', content: '', category: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postService.createPost(form); // auto-attaches token
      navigate('/');
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
      <input
        name="title"
        placeholder="Post Title"
        onChange={handleChange}
        value={form.title}
        required
        className="w-full border p-2 mb-3"
      />
      <textarea
        name="content"
        placeholder="Content"
        onChange={handleChange}
        value={form.content}
        required
        className="w-full border p-2 mb-3"
      />
      <input
        name="category"
        placeholder="Category"
        onChange={handleChange}
        value={form.category}
        required
        className="w-full border p-2 mb-3"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Post
      </button>
    </form>
  );
}
