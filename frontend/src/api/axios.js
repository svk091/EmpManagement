import axios from "axios";
const axiosInstance = axios.create({
  baseUrl: import.meta.env.VITE_SERVER_URL
})

export default axiosInstance