import axios from "axios";

const api = axios.create({
    baseURL: "https://sells-management.onrender.com/api",
    withCredentials: true
});


export default api;