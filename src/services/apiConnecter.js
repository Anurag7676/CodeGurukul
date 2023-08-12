import axios from "axios"

//API call generic method for GET/PUT/DELETE/UPDATE
export const axiosInstance=axios.create({});

//API call function( )
export const apiConnecter=(method ,url, bodyData,headers,params)=>{

    return axiosInstance({
        method:method,
        url:`${url}`,
        data:bodyData,
        headers:headers,
        params:params
    });
}