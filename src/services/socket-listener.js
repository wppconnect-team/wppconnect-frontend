import {socket} from "./api";

export function listenerMessages(cb) {
    socket.off("received-message").on("received-message", (message) => {
        return cb(null, message);
    });
}