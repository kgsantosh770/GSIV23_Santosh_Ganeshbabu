import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    timeout: 10000,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_THEMOVIEDB_ACCESS_TOKEN}`,
    }
});

export default apiClient;
