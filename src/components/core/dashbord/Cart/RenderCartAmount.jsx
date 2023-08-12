import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPIs";
const RenderCartAmount = () => {

  const {user}=useSelector((state)=>state.profile);
  const {token}=useSelector((state)=>state.auth)
  const { total, cart } = useSelector((state) => state.cart);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);

    //TODO: API integrate -> payment gateway tak leke jaegi
    if(token)
    {
       buyCourse(token ,courses,user,navigate,dispatch,"cartBuy")
    }
     
  };
  return (
    <div className="bg-[#161D29] mx-4 px-3 py-2">
      <p>Total:</p>
      <p className="text-font-bold lg:text-2xl text-yellow-50 ">Rs {total}</p>

      <button 
      className="bg-yellow-100 w-full rounded-md py-2 my-4"
      onClick={handleBuyCourse}>Buy</button>
    </div>
  );
};

export default RenderCartAmount;
