import axios from "axios";
import axiosInstance from '../axiosConfig';

const API_URL = "http://localhost:8080/api/users";
const AUTH_URL = "http://localhost:8080/auth";

export const registerUser = (user) => axios.post(`${API_URL}/register`, user);
export const authenticateUser = (credentials) => axios.post(`${AUTH_URL}/login`, credentials);
export const getUserProfile = () => axiosInstance.get(`${API_URL}/profile`);
