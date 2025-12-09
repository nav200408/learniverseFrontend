import axios from "axios";
import { refereshService } from "./AuthService/authService.js"; 

const axiosClient = axios.create({
    baseURL: "http://localhost:8084",
    headers: {
        "Content-Type": "application/json"
    }
});

// Request Interceptor - thêm access token
axiosClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("access token");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// Response Interceptor - nếu lỗi 401 → refresh → retry
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Nếu lỗi 401 và chưa retry lần 2
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refresh token");

                // Gọi API refresh token
                const newAccessToken = await refereshService(refreshToken);

                // Lưu token mới
                localStorage.setItem("access token", newAccessToken);

                // Gắn token mới vào header
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Gọi lại API ban đầu
                return axiosClient(originalRequest);
            } catch (err) {
                console.error("Refresh token failed", err);
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
