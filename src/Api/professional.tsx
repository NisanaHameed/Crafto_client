import api from '../Services/axios'
import profRoutes from '../Services/Endpoints/profEndpoints'
import errorHandler from './errorHandler'

export const signup = async (email:string,password:string)=>{
    try{
        let res = await api.post(profRoutes.signup,{email,password})
        return res;
    }catch(err){
        console.log(err);
        errorHandler(err as Error);
    }
}

export const login = async (email:string,password:string)=>{
    try{
        let res = await api.post(profRoutes.login,{email,password});
        return res;
    }catch(err){
        console.log(err);
        errorHandler(err as Error);
    }
}

export const verifyOTP = async (otp:string)=>{
    try{
        let res = await api.post(profRoutes.verifyotp,{otp});
        return res;
    }catch(err){
        console.log(err);
        errorHandler(err as Error);
    }
}

export const gsignup = async (firstname:string,email:string,password:string)=>{
    try{
        let res = await api.post(profRoutes.gsignup,{firstname,email,password})
        return res;
    }catch(err){
        console.log(err);
        errorHandler(err as Error);
    }
}

export const fillProfile = async (data:FormData)=>{
    try{
        let token = localStorage.getItem('profData')
        console.log(token)
        if(!token){
            return null;
        }else{
            const headers = {
                'authorization' : `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
            let res = await api.post(profRoutes.fillProfile,data,{headers});
            return res;
        }
             
    }catch(err){
        console.log(err);
        errorHandler(err as Error);
    }
}