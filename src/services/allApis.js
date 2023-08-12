
//const BASE_URL="http://localhost:4000/api/v1";
const BASE_URL= process.env.REACT_APP_BASE_URL

//catagories end point
export const catagories={
    CATAGORIES_API:BASE_URL +"/course/show/all-categories"
}

//authentication end point
export const authendpoint={
    RESETPASSWORD_TOKEN:BASE_URL+ "/auth/reset/password/token",
    RESETPASSWORD_API:BASE_URL+"/auth/reset/password",
    SENDOTP_API:BASE_URL+"/auth/sendotp",
    SIGNUP_API:BASE_URL+"/auth/signup",
    LOGIN_API:BASE_URL +"/auth/login",
    CHANGE_PROFILE_PICTURE_API:BASE_URL+"/profile/update/profilepicture",
    CHANGE_PROFILE_DETAILS:BASE_URL + "/profile/update/profile",
    CHANGE_PASSWORD_API:BASE_URL +"/auth/changepassword"
}

export const profileendpoint={
  //  GET_ENROLLED_COURSE:"http://localhost:4000/api/v1/profile/get-enrolledcourse",
     GET_ENROLLED_COURSE:BASE_URL +"/profile/get-enrolledcourse",
    GET_INSTRUCTOR_DASHBORD_DATA_API:BASE_URL +'/profile//get/instructor/dashboard/data'
}

export const courseDetailsEndpint={
    COURSE_CATAGORIES_API: BASE_URL +"/course/show/all-categories",
    CREATE_COURSE_API:BASE_URL + "/course/create-course",
    ADD_SECTION_API:BASE_URL +"/course/add-section",
    CREATE_SUB_SECTION_API:BASE_URL + "/course/add/subsection",
    DELETE_SECTION_API:BASE_URL +"/course/delete/section",
    UPDATE_SECTION_API:BASE_URL+"/course/update/section",
    UPDATE_SUBSECTION_API:BASE_URL +"/course/update/subsection",
    DELETE_SUBSECTION_API:BASE_URL + "/course/delete/subsection",
    EDIT_COURSE_API:BASE_URL + "/course/edit/course",
    GET_ALL_INSTRUCTOR_COURSE_API:BASE_URL +"/course/instructor/all-course",
    DELETE_COURSE_API:BASE_URL +"/course/delete/course",
    GET_COURSE_FULL_DETAILS_API :BASE_URL + "/course/full/details/of-course"
    //http://localhost:4000/api/v1/course/full/details/of-course
}

export const categoryPageDataEndpoint={
    GET_CATEGORY_PAGEDETAILS_API:BASE_URL +"/course/get/category/page-details"
}

export const studentfeaturesEbdpoint={
    COURSE_PAYMENT_API:BASE_URL +"/payments/capture-payment",
    COURSE_VERIFY_API: BASE_URL +"/payments/verify-signature",
    SEND_PAYMENT_SUCCESS_EMAIL_API:BASE_URL+"/payments/send/payment/success-mail",
    SEND_RATING_REVIEW_API:BASE_URL +"/course/create/rating-review",
    MRK_LECTURE_COMPLETE_API:BASE_URL +"/course/mark/complete-lecture",
    GET_ALL_REVIEW_API:BASE_URL +"/course/get/all/rating-review",
}