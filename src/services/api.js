import axios from 'axios'
import {io} from 'socket.io-client';

const ip = 'http://localhost:21465/'
export const socket = io(`http://localhost:21465/`);

export const api = axios.create({
    baseURL: ip
})

api.defaults.headers = {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
};

export default api;
