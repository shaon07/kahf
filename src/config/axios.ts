// axiosInstance.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api/v1", // Replace with your base URL
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    
    // Add other default headers here
  },
});

// You can also intercept requests or responses if needed
api.interceptors.request.use(
  (config) => {
    // Modify request config before sending, like adding authorization token
    const token = localStorage.getItem("token"); // Example: Get token from local storage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally, e.g., logging out on 401
    if (error.response.status === 401) {
      // Handle Unauthorized error (e.g., redirect to login)
    }
    return Promise.reject(error);
  }
);

export default api;
