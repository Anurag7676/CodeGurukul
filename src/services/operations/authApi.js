import { toast } from "react-hot-toast";

import { apiConnecter } from "../apiConnecter";
import { authendpoint } from "../allApis";
import {setLoading,setToken} from "../../Redux/slice/authSlice";
import {setUser} from "../../Redux/slice/profileSlice"
import {resetCart} from "../../Redux/slice/cartSlice"


//reset password link 
const {
  RESETPASSWORD_TOKEN ,
  RESETPASSWORD_API,
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API
}=authendpoint;

export function sendOtp(email,navigate){

  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));

    try {
      const response=await apiConnecter("POST",SENDOTP_API,{email,
        checkUserPresent: true,
      });
      console.log("SENDOTP API RESPONSE............", response);


      toast.success("OTP Sent Successfully")
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUP(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate){

  return async(dispatch)=>{

    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))

    try {
      
      const response=await apiConnecter("POST",SIGNUP_API,
      {accountType,firstName,lastName,email,password,confirmPassword,otp,});

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } 
    catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function getPasswordResettoken(email,setIsemailsent){
 
    return async(dispatch)=>{
       dispatch(setLoading(true));
       
       try {
            const response= await apiConnecter("POST",RESETPASSWORD_TOKEN,{email,} );
           
            if (!response.data.success) {
                throw new Error(response.data.message)
              }
            setIsemailsent(true);

            toast.success("Email sent sucessfully.")
       } catch (error) {
         
           console.log("Code fat gaya jab reset link vej raha thaa",error);
           toast.error(`${error?.response?.data?.message}`);
       }
       dispatch(setLoading(false))
    }
};

export function updatePassword(password,confirmpassword,token){
  return async(dispatch)=>{
    dispatch(setLoading(true));
    try {
        const response=await apiConnecter("POST",RESETPASSWORD_API,{password,confirmpassword,token});

        console.log(response);

        toast.success("Password change sucessfully");
    } catch (error) {
        console.log("Code fat gaya jab new password set kar raha tah", error);
        toast.error("Code fat gaya")
    }
  }
};

export function login(email,password,navigate){

  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnecter("POST", LOGIN_API, {
        email,
        password,
      })


      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))
      
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      navigate("/")
    } 
    catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function logout(navigate){
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
     dispatch(resetCart())
     localStorage.clear();
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
 
  }
}
