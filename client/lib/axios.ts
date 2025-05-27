import axios from "axios";
import { getToken } from "./getToken";

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

api.interceptors.request.use(async (req) => {
  const token = await getToken();
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const error = err?.response?.data || err.message || err;
    console.log("💥 API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
