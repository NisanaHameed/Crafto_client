import { GoogleLogin,CredentialResponse } from "@react-oauth/google"
import { gsignup,login } from "../../Api/user"
import { gsignup as profGsignup,login as profLogin } from "../../Api/professional"
import {jwtDecode} from 'jwt-decode'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { setProfCredential, setUserCredential } from "../../Store/Slice/AuthSlice"

interface gauthProps{
    Login:Boolean,
    user:Boolean
}

const GoogleAuth = ({Login,user}:gauthProps) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const gsignUp = async (res:CredentialResponse)=>{
        const result:any = jwtDecode(res.credential as string);
        const data = {
            name:result.name,
            email:result.email,
            password:"crafto@8794",
            isGoogle:true
        }

        if(user){
            if(!Login){
                const res = await gsignup(data.name,data.email,data.password);
                if(res.data?.success){
                    toast.success("Successfully registered!");
                    dispatch(setUserCredential(res.data.token));
                    navigate('/')
                }
            }else{
                const res = await login(data.email,data.password);
                
                if(res.data.success){
                    toast.success("successfully logged in!");
                    dispatch(setUserCredential(res.data.token));
                    navigate('/')
                }
            }
        }else{
            if(!Login){
                const res = await profGsignup(data.name,data.email,data.password);
                
                if(res.data.success){
                    toast.success("Successfully registered!");
                    await dispatch(setProfCredential(res.data.token));
                    navigate('/professional/fillProfile')
                }
            }else{
                const res = await profLogin(data.email,data.password);
               
                if(res.data.success){
                    toast.success("successfully logged in!");
                    dispatch(setProfCredential(res.data.token));
                    navigate('/professional')
                }
            }
        }
    }

  return (
    <div className="flex justify-center">
        <div className="w-[400px]">
      <GoogleLogin
       onSuccess={(CredentialResponse)=>{
        gsignUp(CredentialResponse);
      }}
      onError={()=>{
        console.log("Login failed!")
      }} />
      </div>
    </div>
  )
}

export default GoogleAuth
