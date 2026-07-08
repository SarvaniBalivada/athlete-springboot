import axios from "axios";

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        console.log("API Request:", config.method.toUpperCase(), config.url);
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("API Response:", response.status, response.config.url);
        return response;
    },
    (error) => {
        if (error.response) {
            console.error("API Error:", error.response.status, error.config?.url, error.response.data);
        } else {
            console.error("API Error:", error.message);
        }
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
