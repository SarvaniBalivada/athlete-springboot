import axios from "axios";
import axiosInstance from '../axiosConfig';

const API_URL = "http://localhost:8080/api/users";
const AUTH_URL = "http://localhost:8080/api/auth";

export const registerUser = (user) => {
    console.log("Registering user:", user);
    return axios.post(`${AUTH_URL}/register`, user);
}
export const authenticateUser = (credentials) => {
    console.log("Authenticating:", credentials);
    return axios.post(`${AUTH_URL}/login`, credentials);
}
export const getUserProfile = () => axiosInstance.get(`${API_URL}/profile`);
