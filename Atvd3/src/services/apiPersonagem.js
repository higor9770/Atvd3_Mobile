import axios from 'axios';

const apiPersonagem = axios.create({
    baseURL: 'https://swapi.dev/api/'
});

export default apiPersonagem;