import api from '../Services/axios'
import adminRoutes from '../Services/Endpoints/adminEndpoints';
import errorHandler from './errorHandler';

export const login = async (email: string, password: string) => {
    try {
        console.log('In admin api')
        let res = await api.post(adminRoutes.login, { email, password });
        console.log(res)
        return res;
    } catch (err) {
        console.log(err);
        errorHandler(err as Error);
    }
}

export const getUsers = async () => {
    try {
        let res = await api.get(adminRoutes.getUsers);
        return res;
    } catch (err) {
        console.log(err);
        errorHandler(err as Error);
    }
}

export const getProfessionals = async () => {
    try {
        let res = await api.get(adminRoutes.getProfessionals);
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
        const res = await api.post(adminRoutes.addJobrole, { name });
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

export const logout = async () => {
    try {
        const res = await api.get(adminRoutes.logout);
        return res;
    } catch (err) {
        errorHandler(err as Error);
    }
}