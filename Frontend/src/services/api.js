import axios from "axios";

const BASE_URL = "http://localhost:8080/api/tasks";
const AUTH_URL = "http://localhost:8080/api/auth";

const axiosInstance = axios.create();

// Add token to all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) => 
  axios.post(`${AUTH_URL}/login`, { email, password });

export const signup = (email, password, name) => 
  axios.post(`${AUTH_URL}/signup`, { email, password, name });

export const getTasks = () => axiosInstance.get(BASE_URL);
export const createTask = (task) => axiosInstance.post(BASE_URL, task);
export const updateTask = (id, task) => axiosInstance.put(`${BASE_URL}/${id}`, task);
export const deleteTask = (id) => axiosInstance.delete(`${BASE_URL}/${id}`);