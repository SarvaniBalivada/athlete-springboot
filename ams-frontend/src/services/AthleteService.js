import axios from 'axios';
import axiosInstance from '../axiosConfig';

const REST_API_BASE_URL='http://localhost:8080/api/athletes';

export const listAthletes=()=>axiosInstance.get(REST_API_BASE_URL);
export const createAthlete=(athlete) => 
    axiosInstance.post(REST_API_BASE_URL,athlete);
export const getAthlete=(athleteId) =>
    axiosInstance.get(`${REST_API_BASE_URL}/${athleteId}`);
export const updateAthlete=(athleteId,athlete) =>
    axiosInstance.put(`${REST_API_BASE_URL}/${athleteId}`,athlete);
export const deleteAthlete=(athleteId) =>
    axiosInstance.delete(`${REST_API_BASE_URL}/${athleteId}`);
