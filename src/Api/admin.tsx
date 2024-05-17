import api from '../Services/Config/axios'
import adminRoutes from '../Services/Endpoints/adminEndpoints';
import errorHandler from './errorHandler';

export const login = async (email: string, password: string) => {
    try {
        console.log('In admin api')
        let res = await api.post(adminRoutes.login, { email, password });
        return res;
    } catch (err) {
        console.log(err);
        errorHandler(err as Error);
    }
}

export const getUsers = async (page: number, limit: number) => {
    try {
        let res = await api.get(`${adminRoutes.getUsers}?page=${page}&limit=${limit}`);
        return res;
    } catch (err) {
        errorHandler(err as Error);
        return err;
    }
}

export const getProfessionals = async (page: number, limit: number) => {
    try {
        let res = await api.get(`${adminRoutes.getProfessionals}?page=${page}&limit=${limit}`);
        return res;
    } catch (err) {
        console.log(err);
        errorHandler(err as Error);
    }
}

export const blockUser = async (id: string) => {
    try {
        let res = await api.post(`${adminRoutes.blockUser}/${id}`);
        return res;
    } catch (err) {
        console.log(err);
        errorHandler(err as Error);
    }
}

export const blockProfessional = async (id: string) => {
    try {
        let res = await api.post(`${adminRoutes.blockProfessional}/${id}`);
        return res;
    } catch (err) {
        console.log(err);
        errorHandler(err as Error);
    }
}

export const getCategory = async () => {
    try {
        const res = await api.get(adminRoutes.category);
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const addCategory = async (data: FormData) => {
    try {
        const res = await api.post(adminRoutes.addCategory, data);
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const editCategory = async (data: FormData) => {
    console.log(data)
    try {
        const res = await api.put(adminRoutes.editCategory, data);
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const getJobrole = async () => {
    try {
        const res = await api.get(adminRoutes.jobrole);
        console.log(res)
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const addJobrole = async (name: string) => {
    try {
        console.log(name)
        const res = await api.post(adminRoutes.addJobrole, { name: name });
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const deleteJobrole = async (id: string) => {
    console.log(id)
    try {
        const res = await api.delete(`${adminRoutes.deleteJobrole}/${id}`);
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const editJobrole = async (id: string, name: string) => {
    try {
        const res = await api.put(adminRoutes.editJobrole, { id: id, name: name });
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const getSubscriptions = async () => {
    try {
        const res = await api.get(adminRoutes.getSubscriptions);
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const subscriptionDetails = async (id: string) => {
    try {
        const res = await api.get(`${adminRoutes.subscriptionDetails}/${id}`);
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const getDashboardDetails = async () => {
    try {
        const res = await api.get(adminRoutes.getDashboardDetails);
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}

export const logout = async () => {
    try {
        const res = await api.get(adminRoutes.logout);
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}