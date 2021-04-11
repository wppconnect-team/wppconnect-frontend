import {defaultKey} from "../services/auth";

const key = JSON.parse(defaultKey());

const config = {headers: {Authorization: `Bearer ${key.token}`}};
export default config;