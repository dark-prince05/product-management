import axios from "axios";

const api = axios.create({
  baseURL: "https://product-management-xpiu.onrender.com/api",
});

export default api;
