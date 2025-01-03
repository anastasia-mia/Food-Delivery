import axios, {AxiosInstance} from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000,
    withCredentials: true
})

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if(error.response?.status === 401){
            console.error('Not authorised! Please, log in.');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;