import axios from 'axios';

const API_BASE_URL = 'http://localhost:3003'; // || REACT_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const createApiWithAuth = (accessToken: string) => {
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return api;
};
