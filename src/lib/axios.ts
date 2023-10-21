import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://todoapp-8utc.onrender.com'
})