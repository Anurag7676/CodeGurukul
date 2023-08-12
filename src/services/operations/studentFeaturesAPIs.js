import { toast } from "react-hot-toast";
import { studentfeaturesEbdpoint } from "../allApis";
import {apiConnecter} from "../apiConnecter";
import {resetCart} from "../../Redux/slice/cartSlice"
import {setPaymentLoading} from "../../Redux/slice/courseSlice"
import logo from "../../assets/Logo/rzp_logo.png"
import {setUser} from "../../Redux/slice/profileSlice"




const {COURSE_PAYMENT_API, 
    COURSE_VERIFY_API, 
    SEND_PAYMENT_SUCCESS_EMAIL_API,
    SEND_RATING_REVIEW_API,
    MRK_LECTURE_COMPLETE_API,
    GET_ALL_REVIEW_API
}=studentfeaturesEbdpoint;


//pyment API
//load the script
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export const buyCourse=async(token, courses, userDetails, navigate, dispatch,buyType)=>{
    const toastId = toast.loading("Loading...");

    try {
        
         //load the script
         const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

         if(!res) {
             toast.error("RazorPay SDK failed to load");
             return;
         }

         //capture payments
         console.log("call capture payment");
        const orderResponse=await apiConnecter("POST",COURSE_PAYMENT_API,
                                                 {courses},
                                              { 
                                                 Authorisation: `Bearer ${token}`,
                                              });
        console.log("PRINTING orderResponse", orderResponse);  
        
        //create options
        const options={
            key:'rzp_test_xSN2ppVyI3uolr',//replace it****
            currency:orderResponse?.data?.data?.currency,
            amount:`${orderResponse?.data?.data?.amount /100}`,
            name:"Code Gurukul",
            order_id:orderResponse?.data?.data.id,
            description: "Thank You for Purchasing the Course",
            image:logo,
            prefill: {
                name:`${userDetails?.firstName}`,
                email:userDetails.email
            },
            handler: function(response) {
                 //verifyPayment
              verifyPayment({...response, courses}, token, navigate, dispatch,buyType);

                //send successful wala mail
         //   sendPaymentSuccessEmail(response,orderResponse?.data?.data?.id,orderResponse?.data?.data?.amount,token );

            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
        

    }catch (error) {
        
        console.log(error.message);
    }
    toast.dismiss(toastId);
}

// async function sendPaymentSuccessEmail(response,orderId, amount, token) {
//     try{

//         await apiConnecter("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
//             orderId,
//             paymentId: response.razorpay_payment_id,
//             amount,
//         },{
//             Authorisation: `Bearer ${token}`
//         })
//     }
//     catch(error) {
//         console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
//     }
// }

async function verifyPayment(bodyData, token, navigate, dispatch,buyType) 
{
    const toastId = toast.loading("Verifying Payment...."); 
    dispatch(setPaymentLoading(true));
    try{

        console.log("in verify payment->",bodyData);
        const response  = await apiConnecter("POST", COURSE_VERIFY_API, bodyData, {
            Authorisation:`Bearer ${token}`,
        })

        console.log("response of verify signature..->",response);
        
        //after buy course set user with updaed buy course array
        dispatch(setUser(response?.data?.data));

        //same set in local storage
        localStorage.setItem("user", JSON.stringify(response.data.data));

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolled-courses");

        if(buyType ==="cartBuy")
        {
            dispatch(resetCart());
        }

      
       
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}

//give rating and review of course
export const giveRatingReview=async(data,token)=>{
    const toastId = toast.loading("Loading...");

    try {
        
        const res=await apiConnecter("POST",SEND_RATING_REVIEW_API,data,
                                       {
                                        Authorisation: `Bearer ${token}`,
                                       }
                                    )
      
       
       toast.success("Thanks for your reviews");
    } catch (error) {
        toast.error(error.message);
        console.log("Error in send rating review Api-->",error.message);
    }

    toast.dismiss(toastId);
}

//mark lecture complte
export const markLectureCompleted=async(data,token)=>{

    const toastId = toast.loading("Loading...");
    let result=null;
    try {
        const res=await apiConnecter("POST",MRK_LECTURE_COMPLETE_API,data,
                                     {Authorisation: `Bearer ${token}`,}
                                   )
        toast.success("Complte mrk successfully");  
        result=res;                          
    } catch (error) {
        
        console.log(error);
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

//get al review
export const getAllReview=async(token)=>{
    const toastId = toast.loading("Loading...");
    let res=[]
    try {
        let responce=await apiConnecter("GET",GET_ALL_REVIEW_API,null);
        res=responce?.data?.data
    } catch (error) {
        
        console.log("Error in get all review",error)
    }
    
    toast.dismiss(toastId); 
    return res;
}