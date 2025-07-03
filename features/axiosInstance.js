import axios from "axios";

const origin = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: origin,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized, please login again.");
      } else if (error.response.status === 500) {
        console.error("Internal server error, please try again later.");
      } else {
        console.error("An error occurred: ", error.response.data.message);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
