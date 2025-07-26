import axios from 'axios';
import { User } from '../store/slices/userSlice';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// API functions for React Query
export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

export const fetchUserById = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  const response = await api.post('/users', userData);
  return response.data;
};

export const updateUser = async ({ id, ...userData }: User): Promise<User> => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

// Posts API
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await api.get('/posts');
  return response.data;
};

export const fetchPostsByUserId = async (userId: number): Promise<Post[]> => {
  const response = await api.get(`/posts?userId=${userId}`);
  return response.data;
};