import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/auth', // Base URL of your backend API
    timeout: 5000, // Set timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
