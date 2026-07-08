import axios from 'axios';
import axiosInstance from '../axiosConfig';

const REST_API_BASE_URL='http://localhost:8080/api/competitions';

export const listCompetitions=()=>axiosInstance.get(REST_API_BASE_URL);
export const createCompetition=(competition) => axiosInstance.post(REST_API_BASE_URL,competition);
export const getCompetition=(competitionId) => axiosInstance.get(`${REST_API_BASE_URL}/${competitionId}`);
export const updateCompetition=(competitionId,competition) => axiosInstance.put(`${REST_API_BASE_URL}/${competitionId}`,competition);
export const deleteCompetition=(competitionId) => axiosInstance.delete(`${REST_API_BASE_URL}/${competitionId}`);
