import { apiClient } from '../config/api';

const AccountService = {
  async getAll() { return await apiClient.get('/api/accounts'); },
  async getById(id) { return await apiClient.get(`/api/accounts/${id}`); },
  async getGames() { return await apiClient.get('/api/games'); },
  async create(data) { return await apiClient.post('/api/accounts', data); },
  async update(id, data) { return await apiClient.put(`/api/accounts/${id}`, data); },
  async delete(id) { return await apiClient.delete(`/api/accounts/${id}`); }
};

export default AccountService;