import axios from "axios";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  // Intercept requests
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = user?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Intercept responses
  axiosSecure.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        console.error(`Request failed with status ${err.response.status}`);
        // Instead of logout or loading, just reject with the status
        return Promise.reject({
          status: err.response.status,
          message: err.response.data?.message || "Unauthorized/Forbidden",
        });
      }
      return Promise.reject(err);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
