import api from '../Services/axios'
import adminRoutes from '../Services/Endpoints/adminEndpoints';

export const login = async (email:string,password:string)=>{
    try{
        console.log('In admin api')
        let res = await api.post(adminRoutes.login,{email,password});
        console.log(res)
        return res;
    }catch(err){
        console.log(err);
    }
}

export const getUsers = async ()=>{
    try{
        let res = await api.get(adminRoutes.getUsers);
        return res;
    }catch(err){
        console.log(err);
    }
}

export const getProfessionals = async ()=>{
    try{
        let res = await api.get(adminRoutes.getProfessionals);
        return res;
    }catch(err){
        console.log(err);
    }
}

export const blockUser = async(id:string)=>{
    try{
        let res = await api.post(`${adminRoutes.blockUser}/${id}`);
        return res;
    }catch(err){
        console.log(err);
    }
}

export const blockProfessional = async(id:string)=>{
    try{
        let res = await api.post(`${adminRoutes.blockProfessional}/${id}`);
        return res;
    }catch(err){
        console.log(err);
    }
}