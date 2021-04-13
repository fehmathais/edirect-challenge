import axios, {AxiosInstance} from "axios";

const instance: AxiosInstance = axios.create({
    baseURL: 'https://edirect.dev/api',
    headers: {
        "content-type": "application/json",
    },
});

export default instance;