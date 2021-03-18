import axios from 'axios'
import {io} from 'socket.io-client';

const ip = 'http://192.168.15.46:21465/'
export const socket = io(`http://192.168.15.46:21465/`);

export const api = axios.create({
    baseURL: ip
})

api.defaults.headers = {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
};

export default api;