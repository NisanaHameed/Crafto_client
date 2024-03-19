import api from '../Services/axios'
import profRoutes from '../Services/Endpoints/profEndpoints'

export const signup = async (email:string,password:string)=>{
    try{
        let res = await api.post(profRoutes.signup,{email,password})
        return res;
    }catch(err){
        console.log(err);
    }
}

export const login = async (email:string,password:string)=>{
    try{
        let res = await api.post(profRoutes.login,{email,password});
        return res;
    }catch(err){
        console.log(err);
    }
}

export const verifyOTP = async (otp:string)=>{
    try{
        let res = await api.post(profRoutes.verifyotp,{otp});
        return res;
    }catch(err){
        console.log(err);
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
        return null;
    }
}