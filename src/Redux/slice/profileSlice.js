
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
   loading:false,
}

const profileSlice=createSlice(
    {
        name:"profile",
        initialState:initialState,
        reducers:{
            setUser(state,action){
                state.user=action.payload;
            },
            setloading(value,state){
                state.loading = value.payload;
            }
        }
    }
);

export const{setUser,setloading}=profileSlice.actions;
export default profileSlice.reducer;