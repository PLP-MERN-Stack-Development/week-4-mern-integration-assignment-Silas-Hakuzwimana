import { useState, useEffect } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function UserForm({ id }) {
  const [form, setForm] = useState({ name: '', email: '', role: 'user', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      API.get(`/auth/users/${id}`).then(res => {
        setForm({ ...res.data, password: '' });
      });
    }
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (id) {
      await API.put(`/auth/users/${id}`, form);
      console.log(form.name + form.email + form.role);
    } else {
      await API.post('/auth/register', form);
    }
    navigate('/');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md max-w-xl mx-auto space-y-5"
    >
      <div>
        <label className="block mb-1 font-semibold text-gray-700">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder='Enter your name ....'
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold text-gray-700">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder='Enter your email ...'
        />
      </div>

      {!id && (
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Password</label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder='Enter a strong password ...'
          />
        </div>
      )}

      <div>
        <label className="block mb-1 font-semibold text-gray-700">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <option value="" disabled>--Select a role --</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          {id ? 'Update' : 'Create'} User
        </button>
      </div>
    </form>
  );
}
