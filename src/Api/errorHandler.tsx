import { AxiosError } from "axios"
import toast from "react-hot-toast";

interface ErrorResponse {
    message: string,
    success?: Boolean
}

const errorHandler = async (error: Error | AxiosError) => {

    const axiosError = error as AxiosError;
    console.log('axiosError',axiosError)
    if (axiosError.response?.data) {
        const errorResponse = axiosError.response.data as ErrorResponse;
        // if (errorResponse.message === "User is blocked by admin!") {
        //     toast.error(errorResponse.message);
        // } else if (errorResponse.message === "Professional is blocked by admin!") {
        //     toast.error(errorResponse.message);
        // } else if(errorResponse.message === 'Session has expired, please log in again.'){
        //     toast.error(errorResponse.message);
        // }else {
        if (errorResponse.message !== "Internal server error!" && errorResponse.message !== 'Unauthorized') {
            toast.error(errorResponse.message);
        }
        // }
    }else{
        toast.error(axiosError.message)
    }
}

export default errorHandler
