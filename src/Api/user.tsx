import api from '../Services/axios'
import userRoutes from '../Services/Endpoints/userEndpoints'
import errorHandler from './errorHandler'

export const signup = async (name:string,email:string,mobile:number,password:string)=>{
    try{
        console.log('in signup api')
        const res = await api.post(userRoutes.signup,{name,email,mobile,password})
        console.log(res)
        return res;
    }catch(err){
        console.log(err)
        errorHandler(err as Error);
    }
}

export const gsignup = async (name:string,email:string,password:string)=>{
    try{
        const res = await api.post(userRoutes.gsignUp,{name,email,password})
        console.log(res);
        return res;
    }catch(err){
        console.log(err);
        errorHandler(err as Error);
    }
}

export const login = async (email:string,password:string)=>{
    try{
        let res = await api.post(userRoutes.login,{email,password});
        console.log(res)
        return res;
    }catch(err){
        console.log(err);
        errorHandler(err as Error);
    }
}

export const verifyOtp = async (otp:string)=>{
    console.log('in api function');
    console.log(otp);
    
    try{
        let res = await api.post(userRoutes.verifyotp,{otp});
        return res;
    }catch(err){
        console.log(err);
        errorHandler(err as Error);
    }
}