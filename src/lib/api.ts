
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

// New tutor API endpoints
export const tutorApi = {
  searchTutors: (params: {
    subject?: string;
    location?: string;
    experienceMin?: number;
    experienceMax?: number;
    grade?: string;
    page: number;
    limit: number;
  }) => {
    // In a real implementation, this would make an API call
    // For now, simulate a response with mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const tutors = [
          {
            id: "t1",
            name: "Neha Sharma",
            profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            qualifications: ["M.Sc. in Mathematics from Delhi University", "B.Ed. from Jamia Millia Islamia"],
            subjects: ["Mathematics", "Physics"],
            experience: 8,
            location: "South Delhi",
            rating: 4.8,
            hourlyRate: 600,
            successStories: "Helped 5 students score 95+ in CBSE Class 12 Mathematics in 2023. Specialized in preparing students for competitive exams.",
            availability: ["Monday", "Wednesday", "Friday", "Saturday"]
          },
          {
            id: "t2",
            name: "Rajiv Malhotra",
            profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            qualifications: ["Ph.D. in Chemistry from IIT Delhi", "B.Tech in Chemical Engineering"],
            subjects: ["Chemistry", "Science"],
            experience: 12,
            location: "West Delhi",
            rating: 4.9,
            hourlyRate: 750,
            successStories: "Mentored students who secured top ranks in JEE and NEET. Specializes in making complex concepts easy to understand.",
            availability: ["Tuesday", "Thursday", "Saturday", "Sunday"]
          },
          {
            id: "t3",
            name: "Priya Agarwal",
            profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            qualifications: ["M.A. in English Literature from JNU", "CELTA Certified"],
            subjects: ["English", "Social Studies"],
            experience: 6,
            location: "East Delhi",
            rating: 4.7,
            hourlyRate: 550,
            successStories: "Specialized in improving English communication skills. Has helped students prepare for IELTS and TOEFL with excellent results.",
            availability: ["Monday", "Tuesday", "Thursday", "Friday"]
          },
          {
            id: "t4",
            name: "Arun Verma",
            profileImage: "https://randomuser.me/api/portraits/men/46.jpg",
            qualifications: ["B.Tech in Computer Science from DTU", "Microsoft Certified Educator"],
            subjects: ["Computer Science", "Mathematics"],
            experience: 5,
            location: "North Delhi",
            rating: 4.6,
            hourlyRate: 650,
            successStories: "Helped students develop coding skills and prepare for programming competitions. Expert in Python and Java programming.",
            availability: ["Wednesday", "Friday", "Saturday", "Sunday"]
          },
          {
            id: "t5",
            name: "Meera Kapoor",
            profileImage: "https://randomuser.me/api/portraits/women/90.jpg",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            qualifications: ["M.Sc. in Physics from Delhi University", "B.Ed. from IP University"],
            subjects: ["Physics", "Mathematics"],
            experience: 9,
            location: "Dwarka",
            rating: 4.9,
            hourlyRate: 700,
            successStories: "Specialized in CBSE and ICSE board exam preparation. Consistently helps students improve their grades by at least 2 levels.",
            availability: ["Monday", "Wednesday", "Thursday", "Saturday"]
          },
          {
            id: "t6",
            name: "Vikram Singh",
            profileImage: "https://randomuser.me/api/portraits/men/97.jpg",
            qualifications: ["M.Com from Shri Ram College of Commerce", "CA Intermediate"],
            subjects: ["Accountancy", "Business Studies", "Economics"],
            experience: 7,
            location: "South Delhi",
            rating: 4.8,
            hourlyRate: 650,
            successStories: "Expert in commerce subjects. Helped students develop strong fundamentals in accountancy and economics.",
            availability: ["Tuesday", "Thursday", "Friday", "Sunday"]
          }
        ];
        
        resolve({
          tutors,
          totalPages: 2
        });
      }, 500);
    });
  },
  
  getTutorById: (id: string) => {
    // In a real implementation, this would make an API call
    // For now, simulate a response with mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const tutors = {
          "t1": {
            id: "t1",
            name: "Neha Sharma",
            profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            qualifications: ["M.Sc. in Mathematics from Delhi University", "B.Ed. from Jamia Millia Islamia", "5+ years experience in CBSE curriculum"],
            subjects: ["Mathematics", "Physics"],
            experience: 8,
            location: "South Delhi",
            rating: 4.8,
            hourlyRate: 600,
            successStories: "Helped 5 students score 95+ in CBSE Class 12 Mathematics in 2023. Specialized in preparing students for competitive exams like JEE and other engineering entrance tests. Focuses on building problem-solving skills and conceptual clarity.",
            availability: ["Monday", "Wednesday", "Friday", "Saturday"]
          },
          "t2": {
            id: "t2",
            name: "Rajiv Malhotra",
            profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            qualifications: ["Ph.D. in Chemistry from IIT Delhi", "B.Tech in Chemical Engineering", "CSIR-NET qualified"],
            subjects: ["Chemistry", "Science"],
            experience: 12,
            location: "West Delhi",
            rating: 4.9,
            hourlyRate: 750,
            successStories: "Mentored students who secured top ranks in JEE and NEET. Specializes in making complex concepts easy to understand through practical examples and demonstrations. Has published research papers in international journals.",
            availability: ["Tuesday", "Thursday", "Saturday", "Sunday"]
          },
          "t3": {
            id: "t3",
            name: "Priya Agarwal",
            profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            qualifications: ["M.A. in English Literature from JNU", "CELTA Certified", "Former content writer for educational publishers"],
            subjects: ["English", "Social Studies"],
            experience: 6,
            location: "East Delhi",
            rating: 4.7,
            hourlyRate: 550,
            successStories: "Specialized in improving English communication skills. Has helped students prepare for IELTS and TOEFL with excellent results. Focuses on grammar, vocabulary building, and comprehensive writing skills.",
            availability: ["Monday", "Tuesday", "Thursday", "Friday"]
          },
          "t4": {
            id: "t4",
            name: "Arun Verma",
            profileImage: "https://randomuser.me/api/portraits/men/46.jpg",
            qualifications: ["B.Tech in Computer Science from DTU", "Microsoft Certified Educator", "Former software developer at a leading tech company"],
            subjects: ["Computer Science", "Mathematics"],
            experience: 5,
            location: "North Delhi",
            rating: 4.6,
            hourlyRate: 650,
            successStories: "Helped students develop coding skills and prepare for programming competitions. Expert in Python and Java programming. Several of his students have developed award-winning projects and secured admissions in prestigious technical institutes.",
            availability: ["Wednesday", "Friday", "Saturday", "Sunday"]
          },
          "t5": {
            id: "t5",
            name: "Meera Kapoor",
            profileImage: "https://randomuser.me/api/portraits/women/90.jpg",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            qualifications: ["M.Sc. in Physics from Delhi University", "B.Ed. from IP University", "Certified career counselor"],
            subjects: ["Physics", "Mathematics"],
            experience: 9,
            location: "Dwarka",
            rating: 4.9,
            hourlyRate: 700,
            successStories: "Specialized in CBSE and ICSE board exam preparation. Consistently helps students improve their grades by at least 2 levels. Uses innovative teaching methods including visual aids and practical demonstrations to explain complex concepts.",
            availability: ["Monday", "Wednesday", "Thursday", "Saturday"]
          },
          "t6": {
            id: "t6",
            name: "Vikram Singh",
            profileImage: "https://randomuser.me/api/portraits/men/97.jpg",
            qualifications: ["M.Com from Shri Ram College of Commerce", "CA Intermediate", "Diploma in Financial Management"],
            subjects: ["Accountancy", "Business Studies", "Economics"],
            experience: 7,
            location: "South Delhi",
            rating: 4.8,
            hourlyRate: 650,
            successStories: "Expert in commerce subjects. Helped students develop strong fundamentals in accountancy and economics. His teaching approach involves practical case studies and real-world examples to make learning engaging and relevant.",
            availability: ["Tuesday", "Thursday", "Friday", "Sunday"]
          }
        };
        
        resolve(tutors[id as keyof typeof tutors]);
      }, 300);
    });
  },
  
  bookSession: (bookingData: any) => {
    // In a real implementation, this would make an API call
    // For now, simulate a successful booking
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Booking data:", bookingData);
        resolve({ success: true, bookingId: "book_" + Math.random().toString(36).substr(2, 9) });
      }, 1000);
    });
  }
};

export default api;
