import axios from "axios";

export const API = axios.create({
  baseURL: "https://mfa-poc-app.herokuapp.com/",
  validateStatus: (status) => {
    if (status === 401) {
      localStorage.clear();
      window.location.href = "/login";
      return false;
    }

    return true;
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  {
    error: (error) => {
      return Promise.reject(error);
    },
  }
);
