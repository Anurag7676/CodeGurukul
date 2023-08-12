import { toast } from "react-hot-toast";
import { apiConnecter } from "../apiConnecter";
import { courseDetailsEndpint } from "../allApis";


const {
    COURSE_CATAGORIES_API,
    CREATE_COURSE_API,
    DELETE_COURSE_API,
    ADD_SECTION_API,
    UPDATE_SECTION_API,
    DELETE_SECTION_API,
    CREATE_SUB_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,
    EDIT_COURSE_API,
    GET_ALL_INSTRUCTOR_COURSE_API,
    GET_COURSE_FULL_DETAILS_API
}=courseDetailsEndpint;

export const  fetchCourseCatagory=async()=>{
    
    let result=[];

    try {
          const response=await apiConnecter("GET" ,COURSE_CATAGORIES_API);
          result= response?.data?.data
        } 
    catch (error) 
    {
        console.log("COURSE_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
    }
    return result;
}

export const fetchInstructorAllCourses=async(token)=>{
 
    let result=[];
    const toastId = toast.loading("Loading...");

    try {
        const response=await apiConnecter("GET",GET_ALL_INSTRUCTOR_COURSE_API,null,
                                                              { Authorisation:`Bearer ${token}`,} ); 
    //  console.log(response)      
      
      result=response?.data?.data;     
        
    } catch (error) {
        console.log("Instrutor course API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;

}

export const createCourse=async(data,token)=>{
  
    let result = null
    const toastId = toast.loading("Creating...");

     try {
        
        const response=await apiConnecter("POST",CREATE_COURSE_API,data,
        {
            "Content-Type": "multipart/form-data",
            Authorisation:`Bearer ${token}`,
        });

        console.log("CREATE COURSE API RESPONSE............", response)
        toast.success("Course Details Added Successfully");
        result = response?.data?.data;
     } 
     catch (error) 
     {
        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
     }

     toast.dismiss(toastId)
     return result
}

export const editCourseDetails=async(data,token)=>{
    let result = null
    const toastId = toast.loading("Loading...");

    try {
        const responce=await apiConnecter("POST",EDIT_COURSE_API,data,{

            "Content-Type": "multipart/form-data",
            Authorisation:`Bearer ${token}`,
        })
        console.log(responce);
        result=responce?.data?.data;
    } catch (error) {
        
        console.log("Edit COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const getFullDetailsOfCourse=async(courseId,token)=>{
    const toastId = toast.loading("Loading...")
    let result = null

    try {
        const responce=await apiConnecter("POST",GET_COURSE_FULL_DETAILS_API,{courseId},
                                          { Authorisation:`Bearer ${token}`,});
        
           result=responce?.data?.data                         
    } catch (error) {
        toast.error(error.message);
        console.log("Get full details of course api error:",error.message);
    }
    toast.dismiss(toastId)
    return result
}

export const deleteCourse=async(data,token)=>{
 
    const toastId = toast.loading("Loading...");
     try {
        await apiConnecter("DELETE",DELETE_COURSE_API,data,{
                                 Authorisation:`Bearer ${token}`,
                                         });
         toast.success("Course deleted successfully")                                
     } catch (error) {
        
        console.log("Delete course api error:",error.message);
        toast.error(`${error.message}`);
     }
    toast.dismiss(toastId)
 
}

export const createSection=async(data,token)=>{
    let result;
    const toastId = toast.loading("Creating...");
    try {
        const responce=await apiConnecter("POST",ADD_SECTION_API,data,{
            Authorisation:`Bearer ${token}`,
        });

         toast.success("Add section successfully")
         result=responce?.data?.data;
        // result=result[0];
        console.log("add section responce",result);
    } catch (error) {
        console.log("Add section API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const editSection=async(data,token)=>{
    let result;
    const toastId = toast.loading("Creating...");
    try {
        const response =await apiConnecter("POST",UPDATE_SECTION_API,data,{
            Authorisation:`Bearer ${token}`,
        });
        toast.success("Edit section name successfully");
        result=response.data.data;
        console.log(result);
    } catch (error) {
        console.log("Edit section API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;
}

export const deleteSection=async(data,token)=>
{ let result;
    const toastId = toast.loading("Deleting section...");
    try {
        const responce=await apiConnecter("POST",DELETE_SECTION_API,data,
        {
            Authorisation:`Bearer ${token}`,
        });

        console.log('AFTER DELETING SECTION',responce);
        result=responce?.data?.data;
        toast.success("Deleted section");
    } catch (error) {
        console.log("Deleting section API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;
}

export const createSubSection=async(data,token)=>{
    let result;
    const toastId = toast.loading("Creating sub-section...");

    try {
        const respose=await apiConnecter("POST",CREATE_SUB_SECTION_API,data,
        {
            "Content-Type": "multipart/form-data",
            Authorisation:`Bearer ${token}`,
        }
       );
       toast.success("Add sub-section successfully")
       console.log(respose)
      result=respose?.data?.data;
    } catch (error) {
        console.log("Add sub-section API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const updateSubSection=async(data,token)=>{

     let result;
     const toastId = toast.loading("Creating sub-section...");
     
     try {
        const responce=await apiConnecter("POST",UPDATE_SUBSECTION_API,data,{
            "Content-Type": "multipart/form-data",
            Authorisation:`Bearer ${token}`,
        });
        toast.success("Sub-section updated successfully")
        result=responce.data.data;
        console.log(responce);
     } catch (error) {
        console.log("Updating sub-section API ERROR............", error)
        toast.error(error.message)
     }
     toast.dismiss(toastId)
     return result
}

export const deleteSubsection=async(data,token)=>{
    let result;
    const toastId = toast.loading("Creating sub-section...");

     try {
        const responce=await apiConnecter("POST",DELETE_SUBSECTION_API,data,
                                                      {
                                                          Authorisation:`Bearer ${token}`,
                                                      }
                                        );
         console.log(responce);    
         toast.success("Deleted sub-section successfully");
         result=responce.data.data;
         
     } catch (error) {
        console.log("Updating sub-section API ERROR............", error)
        toast.error(error.message)
     }
    toast.dismiss(toastId)
     return result
}

