import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://password-reset-full-backend.onrender.com/api/auth",
});

export default api;