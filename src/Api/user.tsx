import api from '../Services/axios'
import userRoutes from '../Services/Endpoints/userEndpoints'
import errorHandler from './errorHandler'

interface IRequirement {
    area: string,
    budget: string,
    workPeriod: string,
    service: string,
    rooms?: string,
    type?: string,
    scope?: string,
    plan?: string
}

export const signup = async (name: string, email: string, mobile: number, password: string) => {
    try {
        console.log('in signup api')
        const res = await api.post(userRoutes.signup, { name, email, mobile, password })
        const token = res.data.token;
        localStorage.setItem('userotp', token)
        console.log(res)
        return res;
    } catch (err) {
        console.log(err)
        errorHandler(err as Error);
    }
}

export const gsignup = async (name: string, email: string, password: string) => {
    try {
        const res = await api.post(userRoutes.gsignUp, { name, email, password })
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
        errorHandler(err as Error);
    }
}

export const login = async (email: string, password: string) => {
    try {
        let res = await api.post(userRoutes.login, { email, password });
        console.log(res)
        return res;
    } catch (err) {
        console.log(err);
        errorHandler(err as Error);
    }
}

export const verifyOtp = async (otp: string) => {
    console.log('in api function');
    console.log(otp);

    try {
        let token = localStorage.getItem('userotp')
        let res = await api.post(userRoutes.verifyotp, { otp }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        localStorage.removeItem('userotp')
        return res;
    } catch (err) {
        console.log(err);
        errorHandler(err as Error);
    }
}

export const userProfile = async () => {
    try {
        let res = await api.get(userRoutes.profile);
        return res;

    } catch (err) {
        errorHandler(err as Error);
        return err;
    }
}

export const editProfile = async (data: FormData) => {
    try {
        console.log(data)
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        const res = await api.patch(userRoutes.editProfile, data, { headers });
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const getDesigns = async (category: string) => {
    try {
        const res = await api.get(`${userRoutes.getDesigns}/${category}`);
        console.log(res)
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const getAllDesigns = async () => {
    try {
        const res = await api.get(userRoutes.getAllDesigns);
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const postRequirement = async (data: IRequirement) => {
    try {
        const res = await api.post(userRoutes.postRequirement, data);
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const getRequirements = async () => {
    try {
        const res = await api.get(userRoutes.getRequirements);
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const updateReq = async (id: string, status: string) => {
    try {
        const res = await api.put(userRoutes.updateReq, { id, status });
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const getConversations = async () => {
    try {
        const res = await api.get(userRoutes.getConversations);
        console.log(res)
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const followProfessional = async (profId: string) => {
    try {
        const res = await api.post(userRoutes.follow, { profId });
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const unfollowProf = async (profId: string) => {
    try {
        const res = await api.post(userRoutes.unfollow, { profId });
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const likePost = async (postid: string) => {
    try {
        const res = await api.put(`${userRoutes.likePost}/${postid}`);
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}
export const unlikePost = async (postid: string) => {
    try {
        const res = await api.put(`${userRoutes.unlikePost}/${postid}`);
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const postDetail = async (postid: string) => {
    try {
        const res = await api.get(`${userRoutes.postDetails}/${postid}`);
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const searchDesigns = async (searchQuery: string) => {
    try {
        const res = await api.get(`${userRoutes.searchDesign}?${searchQuery}`);
        return res;
    } catch (err) {
        errorHandler(err as Error)
    }
}

export const logout = async () => {
    try {
        const res = await api.get(userRoutes.logout);
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}