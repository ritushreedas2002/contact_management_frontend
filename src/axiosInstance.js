import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://contact-management-backend-seven.vercel.app', 
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request sent:', config);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response received:', response);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response || error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
