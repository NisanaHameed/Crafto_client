import api from '../Services/axios'
import profRoutes from '../Services/Endpoints/profEndpoints'
import errorHandler from './errorHandler'

// interface IProfessional {
//     firstname: string,
//     lastname: string,
//     city: string,
//     job: string,
//     company: string,
//     experience: number,
//     bio: string
// }

export const signup = async (email: string, password: string) => {
    try {
        let res = await api.post(profRoutes.signup, { email, password })
        const token = res.data.token;
        localStorage.setItem('profotp', token)
        return res;
    } catch (err) {
        console.log(err);
        errorHandler(err as Error);
    }
}

export const login = async (email: string, password: string) => {
    try {
        let res = await api.post(profRoutes.login, { email, password });
        return res;
    } catch (err) {
        console.log(err);
        errorHandler(err as Error);
    }
}

export const verifyOTP = async (otp: string) => {
    try {
        let token = localStorage.getItem('profotp');
        let res = await api.post(profRoutes.verifyotp, { otp }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res;
    } catch (err) {
        console.log(err);
        errorHandler(err as Error);
    }
}

export const gsignup = async (firstname: string, email: string, password: string) => {
    try {
        let res = await api.post(profRoutes.gsignup, { firstname, email, password })
        const token = res.data.token;
        localStorage.setItem('profotp', token)
        return res;
    } catch (err) {
        console.log(err);
        errorHandler(err as Error);
    }
}

export const fillProfile = async (data: FormData) => {
    try {
        console.log(data)
        let token = localStorage.getItem('profotp');
        console.log(token)
        if (!token) {
            return null;
        } else {
            const headers = {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
            let res = await api.post(profRoutes.fillProfile, data, { headers });
            localStorage.removeItem('profotp');
            return res;
        }

    } catch (err) {
        console.log(err);
        errorHandler(err as Error);
    }
}

export const profProfile = async () => {
    try {
        let res = await api.get(profRoutes.profile);
        return res;
    } catch (err) {
        errorHandler(err as Error)
    }
}

export const editProfile = async (firstname: string, lastname: string, city: string, company: string, job: string, experience: number, bio: string) => {
    try {
        const res = await api.patch(profRoutes.editProfile, { firstname, lastname, city, company, job, experience, bio });
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const editImage = async (image: FormData) => {
    try {
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        const res = await api.patch(profRoutes.editImage, image, { headers });
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const editEmail = async (email: string) => {
    try {
        const res = await api.post(profRoutes.editEmail, { email })
        localStorage.setItem('editEmailToken', res.data.token)
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const verifyEmailOtp = async (otp: string) => {
    try {
        let token = localStorage.getItem('editEmailToken')
        let headers = {
            'authorization': `Bearer ${token}`
        }
        const res = await api.put(profRoutes.verifyEmailOtp, { otp }, { headers })
        localStorage.removeItem('editEmailToken');
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const editPassword = async (newPassword: string, currentPassword: string) => {
    try {
        const res = await api.patch(profRoutes.editPassword, { newPassword, currentPassword });
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const createPost = async (formdata: FormData) => {
    try {
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        const res = await api.post(profRoutes.createPost, formdata, { headers });
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const getPosts = async () => {
    try {
        const res = await api.get(profRoutes.getPosts);
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const logout = async () => {
    try {
        const res = await api.get(profRoutes.logout);
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}