import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";

// Use environment variable
const origin = import.meta.env.VITE_API_URL as string;

if (!origin) {
  throw new Error("VITE_API_URL is not defined in the environment variables.");
}

// Create the Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: origin,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      const message =
        (error.response.data as any)?.message || "An error occurred.";

      if (status === 401) {
        console.error("Unauthorized, please login again.");
      } else if (status === 500) {
        console.error("Internal server error, please try again later.");
      } else {
        console.error(`Error ${status}: ${message}`);
      }
    } else {
      console.error("Network error or no response from server.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
