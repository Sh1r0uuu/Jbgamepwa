import axios from 'axios';
import { BASE_URL } from '../config/api';

const USER_KEY = 'user_session';

const userService = {
  saveUser(userData) {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  },
  getUser() {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },
  logout() {
    localStorage.removeItem(USER_KEY);
    window.location.href = '/login';
  },
  async login(username, password) {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, { username, password });
    if (response.data) this.saveUser(response.data);
    return response.data;
  },
  async register(formData) {
    const response = await axios.post(`${BASE_URL}/api/auth/register`, formData);
    return response.data;
  },
  async updateProfile(id, data) {
    const response = await axios.put(`${BASE_URL}/api/auth/profile/${id}`, data);
    const currentUser = this.getUser();
    this.saveUser({ ...currentUser, ...response.data });
    return response.data;
  },
  isAdmin() {
    const user = this.getUser();
    return user && user.role === 'admin';
  }
};

export default userService;