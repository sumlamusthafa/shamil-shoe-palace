import axios from 'axios';

const API = axios.create({ baseURL: 'https://shamil-shoe-palace-6mh6.vercel.app/api' });

// Attach token for admin routes
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Products
export const getProducts = (params) => API.get('/products', { params });
export const getProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (formData) => API.post('/products', formData);
export const updateProduct = (id, formData) => API.put(`/products/${id}`, formData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Orders
export const placeOrder = (data) => API.post('/orders', data);
export const trackOrder = (orderNumber) => API.get(`/orders/track/${orderNumber}`);
export const getOrders = (params) => API.get('/orders', { params });
export const updateOrderStatus = (id, data) => API.put(`/orders/${id}/status`, data);

// Payment
export const createPaymentIntent = (data) => API.post('/payment/create-intent', data);
export const confirmPayment = (data) => API.post('/payment/confirm', data);

// Auth
export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);

// Admin stats
export const getStats = () => API.get('/admin/stats');
