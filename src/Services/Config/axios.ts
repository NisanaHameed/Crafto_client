import axios,{AxiosInstance} from "axios";

const Api:AxiosInstance = axios.create({
    baseURL:"https://www.crafto.live",
    withCredentials:true
})

export default Api;