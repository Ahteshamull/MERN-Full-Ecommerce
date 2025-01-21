import React, { useState } from "react";
import logo from "../assets/headerImg.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import signinLogo from "../assets/signin.gif";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { handleError, handleSuccess } from "../Util";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    image: null, // Store the image file here
  });

  // Handle input changes (text fields)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password, image } = data;

    if (!name) {
      return handleError("Name must be provided");
    }
    if (!email) {
      return handleError("Email must be provided");
    }
    if (!password) {
      return handleError("Password must be provided");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (image) {
      formData.append("image", image);
    }

   try {
     const response = await axios.post(
       "http://localhost:3000/auth/signup",
       formData,
       {
         headers: {
           "Content-Type": "multipart/form-data",
         },
       }
     );
     const { success, message, error } = response.data;
    
   } catch (error) {
     console.log(error)
   }
    
  };

  return (
    <div className="container mx-auto">
      <div className="font-[sans-serif] bg-white mt-2 flex items-center p-4">
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 md:gap-16 gap-8 bg-gray-50 shadow w-full sm:p-8 p-6 relative">
            <div>
              <Link to={"/"}>
                <div className="md:mb-16 mb-8">
                  <img src={logo} alt="logo" className="w-40 inline-block" />
                </div>
              </Link>
              <div className="md:space-y-8 space-y-4">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 bg-blue-600 fill-white rounded-full p-1 shrink-0"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                  </svg>
                  <h4 className="text-gray-800 text-base">
                    Create Your Account
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 bg-blue-600 fill-white rounded-full p-1 shrink-0"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                  </svg>
                  <h4 className="text-gray-800 text-base">
                    Simple &amp; Secure Registration
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 bg-blue-600 fill-white rounded-full p-1 shrink-0"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                  </svg>
                  <h4 className="text-gray-800 text-base">
                    Terms and Conditions Agreement
                  </h4>
                </div>
              </div>
            </div>
            <form
              onSubmit={handleSignup}
              className="md:max-w-sm w-full mx-auto"
            >
              <div className="md:mb-8 mb-6">
                <h3 className="text-gray-800 text-2xl font-bold">Register</h3>
              </div>
              <div className="space-y-4">
                <div className="mx-auto w-[100px] h-[100px] rounded-full overflow-hidden relative">
                  <div>
                    <img
                      src={
                        data.image
                          ? URL.createObjectURL(data.image)
                          : signinLogo
                      }
                      alt=""
                    />
                  </div>
                  <label>
                    <div className="text-xs bg-slate-200 absolute cursor-pointer py-4 bottom-0 w-full text-center bg-opacity-85">
                      Upload Photo
                    </div>
                    <input
                      onChange={handleImageChange}
                      className="hidden"
                      type="file"
                      accept="image/*"
                    />
                  </label>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    onChange={handleChange}
                    value={data.name}
                    className="bg-transparent border border-gray-400 w-full text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded focus:border-black outline-none"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Email Id
                  </label>
                  <input
                    name="email"
                    type="text"
                    onChange={handleChange}
                    value={data.email}
                    className="bg-transparent border border-gray-400 w-full text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded focus:border-black outline-none"
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      onChange={handleChange}
                      value={data.password}
                      className="bg-transparent border border-gray-400 w-full text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded focus:border-black outline-none"
                      placeholder="Enter password"
                    />
                    <div
                      className="absolute top-2 right-3 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <span>
                        {showPassword ? (
                          <FaEyeSlash size={20} className="text-gray-400" />
                        ) : (
                          <FaEye size={20} className="text-gray-400" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-sm tracking-wide rounded bg-blue-600 hover:bg-blue-700 text-white focus:outline-none"
                >
                  Create Account
                </button>
              </div>
              <p className="text-sm text-gray-800 mt-6 text-center">
                Already have an account?{" "}
                <Link
                  className="text-blue-600 font-semibold hover:underline ml-1"
                  to={"/login"}
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
