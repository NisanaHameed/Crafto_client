import axios,{AxiosInstance} from "axios";

const Api:AxiosInstance = axios.create({
    // baseURL:"https://www.crafto.live/api",
    baseURL:"http://localhost:3000/api",
    withCredentials:true
})

export default Api;