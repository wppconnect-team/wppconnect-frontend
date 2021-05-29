import {defaultKey, getToken, TOKEN_KEY} from "../services/auth";

const key = JSON.parse(defaultKey());

const config = () => {
    if (key !== null) {
        return {headers: {Authorization: `Bearer ${getToken()}`}};
    }
};

export default config;