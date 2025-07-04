// API.js - API service for making requests to the backend

import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/API',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = 'http://localhost:5173/';
    }
    return Promise.reject(error);
  }
);

// Post API services
export const postService = {
  // Get all posts with optional pagination and filters
  getAllPosts: async (page = 1, limit = 10, category = null) => {
    let url = `/posts?page=${page}&limit=${limit}`;
    if (category) {
      url += `&category=${category}`;
    }
    const response = await API.get(url);
    return response.data;
  },

  // Get a single post by ID or slug
  getPost: async (idOrSlug) => {
    const response = await API.get(`/posts/${idOrSlug}`);
    return response.data;
  },

  // Create a new post
  createPost: async (postData) => {
    const response = await API.post('/posts', postData);
    return response.data;
  },

  // Update an existing post
  updatePost: async (id, postData) => {
    const response = await API.put(`/posts/${id}`, postData);
    return response.data;
  },

  // Delete a post
  deletePost: async (id) => {
    const response = await API.delete(`/posts/${id}`);
    return response.data;
  },

  // Add a comment to a post
  addComment: async (postId, commentData) => {
    const response = await API.post(`/posts/${postId}/comments`, commentData);
    return response.data;
  },

  // Search posts
  searchPosts: async (query) => {
    const response = await API.get(`/posts/search?q=${query}`);
    return response.data;
  },
};

// Category API services
export const categoryService = {
  // Get all categories
  getAllCategories: async () => {
    const response = await API.get('/categories');
    return response.data;
  },

  // Create a new category
  createCategory: async (categoryData) => {
    const response = await API.post('/categories', categoryData);
    return response.data;
  },
};

// Auth API services
export const authService = {
  // Register a new user
  register: async (userData) => {
    const response = await API.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default API; 