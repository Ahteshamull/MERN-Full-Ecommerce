import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate for redirection
import { handleError, handleSuccess } from "../Util"; // Ensure these are correctly implemented
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const navigate = useNavigate();
  
  // Add navigate here
  const [showPassword, setShowPassword] = useState(false);
  const {fetchUserDetails} = useContext(Context);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    // Validate email and password
    if (!email || !password) {
      return handleError("Both Email & Password fields are required");
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        loginInfo, // This is the request body
        {
          headers: {
            "Content-Type": "application/json", // Set Content-Type to application/json
          },
          // Use withCredentials to include cookies or credentials
        }
      );

    

      const result = response.data;
      console.log(result)
          const { success, message,token, name, error } = result;
    
          if (success) {
            handleSuccess(message);
            localStorage.setItem("token", token);
            localStorage.setItem("loggedIn", loginInfo.email);
            setTimeout(() => {
             window.location.href = "/";
            }, 1000);
            fetchUserDetails();
          } else if (error) {
            console.log(error);
          }
        } catch (err) {
          const { response } = err;
         
     if (response && response.data && response.data.error) {
       const errorMessage = response.data.error.details[0].message;
       handleError(errorMessage);
     } else {
       
       const { message, success } = response.data
       if (success) {
         handleSuccess(message)
       } else {
         handleError(message)
       }
     }
        }
  };

  return (
    <div className="container mx-auto">
      <div className="font-[sans-serif] max-sm:px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
            <div className="w-full h-full flex items-center bg-[#000842] rounded-xl p-8">
              <img
                src="https://readymadeui.com/signin-image.webp"
                className="w-full aspect-[12/12] object-contain"
                alt="login-image"
              />
            </div>
            <div className="md:max-w-md w-full px-4 py-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-12">
                  <h3 className="text-gray-800 text-3xl font-extrabold">
                    Sign in
                  </h3>
                  <p className="text-sm mt-4 text-gray-800">
                    Don't have an account?{" "}
                    <Link
                      className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                      to={"/signup"}
                    >
                      Register here
                    </Link>
                  </p>
                </div>
                <div>
                  <label className="text-gray-800 text-xs block mb-2">
                    Email
                  </label>
                  <div className="relative flex items-center">
                    <input
                      onChange={handleChange}
                      name="email"
                      type="email" // Changed to "email"
                      value={loginInfo.email}
                      className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
                      placeholder="Enter email"
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <label className="text-gray-800 text-xs block mb-2">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      onChange={handleChange}
                      name="password"
                      value={loginInfo.password}
                      type={showPassword ? "text" : "password"}
                      className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
                      placeholder="Enter password"
                    />
                    <div
                      className="absolute top-[10px] right-2 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <span>
                        {showPassword ? (
                          <FaEyeSlash size={22} className="text-gray-400" />
                        ) : (
                          <FaEye size={22} className="text-gray-400" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                  <Link to={"/forgot-pass"}>
                    <div className="text-blue-600 font-semibold text-sm hover:underline">
                      Forgot Password?
                    </div>
                  </Link>
                </div>
                <div className="mt-12">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
