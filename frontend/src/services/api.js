import axios from 'axios';

// Gunakan Environment Variable untuk URL Backend
// Menggunakan operator Logical OR (||) untuk nilai fallback/default.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor: Sisipkan Token pada setiap request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        // Standar otorisasi Bearer Token
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// --- Endpoint ---
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const registerUser = (data) => api.post('/auth/register', data);
export const fetchProjects = () => api.get('/projects');

export const createProject = (formData) => api.post('/projects', formData, {
    // Penting: Axios otomatis akan mengatur Content-Type: multipart/form-data
    // saat Anda mengirim objek FormData, namun tidak ada salahnya menambahkan eksplisit.
    headers: { 'Content-Type': 'multipart/form-data' } 
});

export const deleteProject = (id) => api.delete(`/projects/${id}`);

export default api;