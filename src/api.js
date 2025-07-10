import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = "https://52.6.236.145.nip.io/api/";

const api = axios.create({
  baseURL: API_BASE_URL
});

export default api;
