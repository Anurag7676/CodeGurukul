import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice.js"
import profileReducer from "../slice/profileSlice.js"
import cartReducer from "../slice/cartSlice.js"
import courseReducer from "../slice/courseSlice.js"
import vieCourseReducer from '../slice/viewCourseSlice.js'

  const rootReducer=combineReducers({
     auth:authReducer,
     profile: profileReducer,
     cart:cartReducer,
     course:courseReducer,
     viewCourse:vieCourseReducer
  });

  export default rootReducer;