import axios from "axios";

export const instanceRec = axios.create({
    baseURL: 'https://api.green-api.com/',
})