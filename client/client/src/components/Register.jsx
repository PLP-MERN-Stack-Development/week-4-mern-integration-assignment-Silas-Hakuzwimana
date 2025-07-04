import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/API';
import { toast } from 'react-toastify';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (err) {
      console.error('Register error:', err);
      toast.error(err.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
            placeholder="Email address"
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
            placeholder="Create a strong password"
          />
        </div>

        <div>
          <label className="block mb-1">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>

      <p className="text-center mt-4">
        Already have an account?{' '}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}
