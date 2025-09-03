import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response: any) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error('API error:', error.response.data);
    } else if (error.request) {
      console.error('No response:', error.request);
    } else {
      console.error('Axios error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
