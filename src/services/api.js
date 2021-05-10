import axios from "axios";
import {io} from "socket.io-client";

const ip = "http://localhost:21465/api/";
export const socket = io("http://localhost:21465/");

export function listenerMessages(cb) {
    socket.off("received-message").on("received-message", (message) => {
       return cb(null, message);
    });
}

export const api = axios.create({
    baseURL: ip
});

export default api;
