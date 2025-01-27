// src/api/services.js
import api from './axios';

// Auth
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout')
};

// Investments
export const investmentService = {
  getAll: (params) => api.get('/investments', { params }),
  create: (data) => api.post('/investments', data),
  getOne: (id) => api.get(`/investments/${id}`),
  update: (id, data) => api.put(`/investments/${id}`, data),
  delete: (id) => api.delete(`/investments/${id}`)
};

// Admin
export const adminService = {
  getStats: () => api.get('/admin/stats'),
  getUsers: (params) => api.get('/admin/users', { params }),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data)
};

// Subscriber
export const subscriberService = {
  getTracking: () => api.get('/subscriber/tracking')
};