import axios from 'axios';
import axiosInstance from '../axiosConfig';

const REST_API_BASE_URL='http://localhost:8080/api/coaches';

export const listCoaches=()=>axiosInstance.get(REST_API_BASE_URL);
export const createCoach=(coach) => axiosInstance.post(REST_API_BASE_URL,coach);
export const getCoach=(coachId) => axiosInstance.get(`${REST_API_BASE_URL}/${coachId}`);
export const updateCoach=(coachId,coach) => axiosInstance.put(`${REST_API_BASE_URL}/${coachId}`,coach);
export const deleteCoach=(coachId) => axiosInstance.delete(`${REST_API_BASE_URL}/${coachId}`);
