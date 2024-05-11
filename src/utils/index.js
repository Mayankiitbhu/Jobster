import axios from "axios";

const baseURL = 'https://redux-toolkit-jobster-api-server.onrender.com/api/v1';

export const customFetch = axios.create({
    baseURL
});