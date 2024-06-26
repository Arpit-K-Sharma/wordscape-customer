import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  // baseURL: "https://erp-api.wordscapepress.com",
  baseURL: "https://localhost:8443",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(token);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fixing the response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Corrected syntax error here
    if (error.response && error.response.status === 401) {
      window.location.href = "/login"; // Redirect to login on 401 error
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
