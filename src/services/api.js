import axios from "axios";
import {io} from "socket.io-client";

const ip = "http://localhost:21465/api/";
export const socket = io("http://localhost:21465/");

export const api = axios.create({
    baseURL: ip
});

export default api;
