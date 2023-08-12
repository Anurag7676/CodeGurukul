import { toast } from "react-hot-toast";

import { apiConnecter } from "../apiConnecter";
import { authendpoint ,profileendpoint} from "../allApis";
import { setloading, setUser } from "../../Redux/slice/profileSlice";

const { 
   CHANGE_PROFILE_PICTURE_API,
   CHANGE_PROFILE_DETAILS ,
   CHANGE_PASSWORD_API,
  
  } = authendpoint;

  const{
    GET_ENROLLED_COURSE,
    GET_INSTRUCTOR_DASHBORD_DATA_API
  
  }=profileendpoint;

export function changeProfilePicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("UPLOADING...");
    dispatch(setloading(true));

    try {
      const response = await apiConnecter(
        "PUT",
        CHANGE_PROFILE_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorisation: `Bearer ${token}`,
        }
      );
     

      toast.success("Display Picture Updated Successfully");
      dispatch(setUser(response.data.data));
    } catch (error) {
      console.log("change profile pic error............", error);
      toast.error("CHANGE PROFILE PICTURE FAILED !");
    }

    dispatch(setloading(false));
    toast.dismiss(toastId);
  };
}

export function changeProfileDetails(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const rseponse = await apiConnecter(
        "PUT",
        CHANGE_PROFILE_DETAILS,
        formData,
        {
          Authorisation: `Bearer ${token}`,
        }
      );

      
      
    toast.success(" Profile Updated Successfully");
    dispatch(setUser(rseponse?.data?.userDetails));
    localStorage.setItem("user",JSON.stringify(rseponse?.data?.userDetails));

    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
  };
}

export function changePassword(token,fromData)
{
   return async(dispatch)=>{
    const toastId = toast.loading("Loading...");

     try {
      
       const renponsc =await apiConnecter("POST",
         CHANGE_PASSWORD_API,
        fromData,
       {
        Authorisation: `Bearer ${token}`,
       });

   
       toast.success(" Profile Updated Successfully");
     } catch (error) {
      console.log("CAHNGE PASSWORD ERROR............", error)
      toast.error("Could Not Update PASSWORD")
     }
     toast.dismiss(toastId);
   }
}

export const getEnrolledCourse=(token,setEnrolledcourse,setCourseProgress)=>{

  return async(dispatch)=>{
      const toastId = toast.loading("Loading...");
      try {
          const response=await apiConnecter("GET", GET_ENROLLED_COURSE,null,
           {
            Authorisation:`Bearer ${token}`,
           }
          );
          setCourseProgress(response?.data?.courseProgress);
          setEnrolledcourse(response?.data?.data);
        

      } 
      catch (error) {
          console.log("GET ENROLLED COURSE ERROR ...........", error)
           toast.error("Could Not get ENROLLED COURSE ")
      }
      toast.dismiss(toastId);
  }
}

//instructor dashboard

export const getInstructorDashboardData=async(token)=>{

  const toastId=toast.loading("loading")
      
  let result=[];
     try {
        
    const respose=await apiConnecter("GET",GET_INSTRUCTOR_DASHBORD_DATA_API,null,{Authorisation:`Bearer ${token}`,})
     
       
       result=respose?.data?.data;
     } catch (error) {
      console.log("error in getdashborad api",error)
     }
   toast.dismiss(toastId);
   return result
}