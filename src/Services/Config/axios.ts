import axios,{AxiosInstance} from "axios";

const Api:AxiosInstance = axios.create({
    baseURL:"https://www.crafto.live/api",
    withCredentials:true
})

export default Api;