import { AxiosError } from "axios"
import toast from "react-hot-toast";

interface ErrorResponse {
    message: string,
    success?: Boolean
}

const errorHandler = (error: Error | AxiosError) => {

    const axiosError = error as AxiosError;
    if (axiosError.response?.data) {
        const errorResponse = axiosError.response.data as ErrorResponse;
        if (errorResponse.message === "User is blocked by admin!") {
            localStorage.removeItem('userData');
            toast.error(errorResponse.message)
        } else if (errorResponse.message === "Professional is blocked by admin!") {
            localStorage.removeItem('profData');
            toast.error(errorResponse.message);
        } else {
            toast.error(errorResponse.message);
        }
    } else {
        toast.error('Something went wrong. Please try again!');
    }
}

export default errorHandler
