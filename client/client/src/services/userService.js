import API from './API';

export const userService = {
  // Get all users
  getAll: async () => {
    const res = await API.get('/auth/users');
    return res.data;
  },

  // Get a user by ID
  getById: async (id) => {
    const res = await API.get(`/auth/users/${id}`);
    return res.data;
  },

  // Register a new user
  create: async (data) => {
    const res = await API.post('/auth/register', data);
    return res.data;
  },

  // Update a user
  update: async (id, data) => {
    const res = await API.put(`/auth/users/${id}`, data);
    return res.data;
  },

  // Delete a user
  remove: async (id) => {
    const res = await API.delete(`/auth/users/${id}`);
    return res.data;
  },
};
