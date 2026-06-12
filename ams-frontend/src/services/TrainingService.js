import axios from 'axios';
import axiosInstance from '../axiosConfig';

const REST_API_BASE_URL='http://localhost:8080/api/trainings';

export const listTrainings=()=>axiosInstance.get(REST_API_BASE_URL);
export const createTraining=(training) => axiosInstance.post(REST_API_BASE_URL,training);
export const getTraining=(trainingId) => axiosInstance.get(`${REST_API_BASE_URL}/${trainingId}`);
export const updateTraining=(trainingId,training) => axiosInstance.put(`${REST_API_BASE_URL}/${trainingId}`,training);
export const deleteTraining=(trainingId) => axiosInstance.delete(`${REST_API_BASE_URL}/${trainingId}`);
