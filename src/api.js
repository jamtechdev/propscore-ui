import axios from "axios";

 const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_BASE_URL = "https://api.mypropscore.com/api/";

const api = axios.create({
  baseURL: API_BASE_URL
});

export default api;
