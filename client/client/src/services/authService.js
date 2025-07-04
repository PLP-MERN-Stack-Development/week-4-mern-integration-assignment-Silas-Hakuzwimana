import API from './API';

export const authService = {
  register: async (data) => {
    const res = await API.post('/auth/register', data);
    return res.data;
  },

  login: async (credentials) => {
    const res = await API.post('/auth/login', credentials);
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};
