import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { navigate } from "../../navigation/utils/navigationHelper";

const axiosInstance = axios.create({
  baseURL: "https://allcookies-tracker.a-dev.com/",
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const token = await AsyncStorageLib.getItem('token')
    if (token) {
      config.headers!["Authorization"] = `${token}`;
    }
    return config;
  },
  
  error => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 401) {
        // navigate('SignIn', {});
        // AsyncStorageLib.clear();
        return Promise.reject(error);
      }
  
      return Promise.reject(error);
    }
  );

export default axiosInstance;