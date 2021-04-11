import {defaultKey} from "../services/auth";

const key = JSON.parse(defaultKey());

const config = () => {
    if (key !== null) {
        return {headers: {Authorization: `Bearer ${key.token}`}};
    }
};

export default config();