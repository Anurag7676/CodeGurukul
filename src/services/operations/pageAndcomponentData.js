import {toast} from "react-hot-toast"
import { apiConnecter } from "../apiConnecter";
import { categoryPageDataEndpoint } from "../allApis";

const{GET_CATEGORY_PAGEDETAILS_API}=categoryPageDataEndpoint;

//category pagedetails api
 export const getCatalogaPageData=async(categoryId)=>{
   
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response =await apiConnecter("POST",GET_CATEGORY_PAGEDETAILS_API,
                                                {categoryID:categoryId,}
                                               );


        result = response?.data;
    } catch (error) {
        console.log("CATALOG PAGE DATA API ERROR....", error.message);
        toast.error("No courses found for the selected category");
        result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}