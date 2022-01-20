import axios, { AxiosRequestConfig } from "axios";
import {
  clearToken,
  getAccessToken,
} from "../services/localStorage/localStorage.service";

import { config } from "../config/config";

const axiosInstance = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers!.Authorization = token;
    }
    return config;
  },

  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/signin';
      clearToken();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
