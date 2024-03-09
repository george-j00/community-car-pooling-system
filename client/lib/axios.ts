import axios from 'axios';

export default async function setupInterceptors(token:string) {
  axios.interceptors.request.use(
    (config) => {
    //   const store = useStore(); // Access the Redux store
    //   const token = store.getState().auth.token;

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
