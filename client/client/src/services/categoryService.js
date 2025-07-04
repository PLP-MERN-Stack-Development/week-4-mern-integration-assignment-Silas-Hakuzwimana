import API from './API';

export const categoryService = {
  getAll: async () => {
    const res = await API.get('/categories');
    return res.data;
  },

  create: async (data) => {
    const res = await API.post('/categories', data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await API.put(`/categories/${id}`, data);
    return res.data;
  },

  remove: async (id) => {
    const res = await API.delete(`/categories/${id}`);
    return res.data;
  },

  getById: async (id) => {
    const res = await API.get(`/categories/${id}`);
    return res.data;
  },
};
