
import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (token expired, etc.)
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // In a real app, you might want to redirect to login or show a notification
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const kingdomApi = {
  getZones: () => api.get('/kingdom/zones'),
  getZoneById: (id: string) => api.get(`/kingdom/zones/${id}`),
  getZoneActivities: (id: string) => api.get(`/kingdom/zones/${id}/activities`),
  getZoneQuizzes: (id: string) => api.get(`/kingdom/zones/${id}/quizzes`),
  trackProgress: (id: string, data: any) => api.post(`/kingdom/zones/${id}/progress`, data)
};

export const userApi = {
  register: (userData: any) => api.post('/users/register', userData),
  login: (credentials: any) => api.post('/users/login', credentials),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData: any) => api.put('/users/profile', userData),
  getAchievements: () => api.get('/users/achievements')
};

export const questApi = {
  getAllQuests: () => api.get('/quests'),
  getQuestsByCategory: (category: string) => api.get(`/quests/category/${category}`),
  getQuestById: (id: string) => api.get(`/quests/${id}`),
  startQuest: (id: string) => api.post(`/quests/${id}/start`),
  submitQuest: (id: string, data: any) => api.post(`/quests/${id}/submit`, data)
};

export const progressApi = {
  getUserProgress: () => api.get('/progress'),
  updateProgress: (data: any) => api.post('/progress', data),
  getLeaderboard: () => api.get('/progress/leaderboard')
};

export default api;
