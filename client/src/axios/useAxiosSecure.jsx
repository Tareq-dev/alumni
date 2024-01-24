import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { authToken, removeToken } = useAuth();

  const createAxiosInstance = () => {
    return axios.create({
      baseURL: "http://localhost:8800/api",
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : undefined,
      },
    });
  };

  const axiosInstance = createAxiosInstance();

  // Add a response interceptor to handle 401 or 403 responses
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        await removeToken();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosSecure;