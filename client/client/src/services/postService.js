import API from './API';

export const postService = {
  getAll: async (page = 1, limit = 10, category = null) => {
    let url = `/posts?page=${page}&limit=${limit}`;
    if (category) url += `&category=${category}`;
    const res = await API.get(url);
    return res.data;
  },

  getById: async (id) => {
    const res = await API.get(`/posts/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await API.post('/posts', data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await API.put(`/posts/${id}`, data);
    return res.data;
  },

  remove: async (id) => {
    const res = await API.delete(`/posts/${id}`);
    return res.data;
  },

  search: async (query) => {
    const res = await API.get(`/posts/search?q=${query}`);
    return res.data;
  },

  addComment: async (postId, comment) => {
    const res = await API.post(`/posts/${postId}/comments`, comment);
    return res.data;
  },
};
