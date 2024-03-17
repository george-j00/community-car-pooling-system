import axios from 'axios';
import { getCookie } from './actions/auth';

export default async function setupInterceptors() {
  axios.interceptors.request.use(
   async (config) => {
      const token  = await getCookie();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // store.dispatch(setLogout()); // Dispatch logout action

        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );
}
