// lib/axios.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001', // Replace with your base URL
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', 
  },
    withCredentials: true,
  // Additional configuration can be added here if needed
});

export default apiClient;
