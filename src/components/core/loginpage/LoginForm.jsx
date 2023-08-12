import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Toogler from "./Toogler";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../services/operations/authApi";

const LoginForm = () => {
  let loginData = {
    email: "",
    password: "",
    accountType: "",
  };
  const [loginInfo, setLoginInfo] = useState(loginData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  function loginformHandler(e) {
    setLoginInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  const [visibility, setVisibility] = useState(true);

  function showPassHandeler(e) {
    setVisibility(!visibility);
    console.log(visibility);
  }

  function submitHandler(e) {
    e.preventDefault();
    dispatch(login(loginInfo.email, loginInfo.password, navigate));
  }

  // set login type user
  function setUser(value) {
    loginInfo.accountType = value;
  }

  return (
    <>
      <div>
        <form
          className="text-richblack-50 flex flex-col gap-4"
          onSubmit={submitHandler}
        >
          {/* TOGGLER */}
          <Toogler accountType={setUser} />

          <label>
            <p>Email</p>
            <input
              className=" px-3 outline-none text-richblack-100 rounded-md text-lg bg-[#161D29] mt-2 py-2"
              type="text"
              name="email"
              value={loginInfo.email}
              onChange={loginformHandler}
            />
          </label>

          <label>
            <p>Password</p>
            <div className="flex items-center">
              <input
                className="mt-2 px-3 outline-none text-richblack-100 rounded-md text-lg bg-[#161D29] py-2"
                type={visibility ? "password" : "text"}
                name="password"
                value={loginInfo.password}
                onChange={loginformHandler}
              />
              <div className="cursor-pointer -ml-8">
                {visibility ? (
                  <AiFillEyeInvisible onClick={showPassHandeler} size={20} />
                ) : (
                  <AiFillEye onClick={showPassHandeler} size={20} />
                )}
              </div>
            </div>
          </label>

          <button
            onClick={() => navigate("/reset-password")}
            className="underline cursor-pointer text-left -mt-3 pt-3"
          >
            Forget Password
          </button>

          <div className="w-full -mt-[2rem]">
            <button
              className="w-[60%] mt-6 text-lg py-2 text-center rounded-md bg-[#FFD60A]
              text-richblack-900"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
