import { useState, useEffect } from 'react';
import API from '../services/API';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UserForm({ id, onSuccess, onCancel }) {
  const [form, setForm] = useState({ name: '', email: '', role: 'user', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      API.get(`/auth/users/${id}`).then(res => {
        const { name, email, role } = res.data;
        setForm({ name, email, role, password: '' });
      });
    }
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const strong = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return strong.test(password.trim());
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const payload = {
        name: form.name,
        email: form.email,
        role: form.role,
      };

      if (form.password && form.password.trim() !== '') {
        if (!validatePassword(form.password)) {
          toast.error("Password must be at least 8 characters and include a number.");
          return;
        }
        payload.password = form.password;
      }

      if (id) {
        await API.put(`/auth/users/${id}`, payload);
        toast.success('User updated successfully!');
      } else {
        if (!validatePassword(form.password)) {
          toast.error("Password must be at least 8 characters and include a number.");
          return;
        }
        await API.post('/auth/register', form);
        toast.success('User created successfully!');
      }

      if (onSuccess) {
        onSuccess(); 
      } else {
        setTimeout(() => navigate('/dashboard'), 1500); 
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong.');
    }
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
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
          placeholder="Enter your name ..."
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold text-gray-700">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
          placeholder="Enter your email ..."
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
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
            placeholder="Enter a strong password ..."
          />
        </div>
      )}

      {id && (
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Change Password (optional)</label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            className="w-full border border-gray-300 rounded px-4 py-2"
            placeholder="Leave blank to keep current password"
          />
        </div>
      )}

      <div>
        <label className="block mb-1 font-semibold text-gray-700">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        >
          <option value="" disabled>-- Select a role --</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Inside UserForm return JSX, near the submit button */}
<div className="pt-4 flex items-center space-x-2">
  <button
    type="submit"
    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
  >
    {id ? 'Update' : 'Create'} User
  </button>
  {onCancel && (
    <button
      type="button"
      onClick={onCancel}
      className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
    >
      Cancel
    </button>
  )}
</div>
    </form>
  );
}
