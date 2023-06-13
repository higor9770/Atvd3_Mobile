import axios from 'axios';

const apiPersonagem = axios.create({
    baseURL: 'https://swapi.dev/api/planets/'
});

export default apiPersonagem;