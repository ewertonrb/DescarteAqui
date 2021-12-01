import axios from 'axios';

const api = axios.create({
    baseURL: 'https://descarte-aqui.herokuapp.com'
});

export default api;