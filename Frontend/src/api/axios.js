import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL, // your backend
  withCredentials: true, // send cookies automatically
});

export default api;