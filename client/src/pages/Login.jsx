import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  console.log("data login ", data);

  return (
    <div className="container mx-auto">
      <div className="font-[sans-serif] max-sm:px-4">
        <div className=" flex flex-col items-center justify-center">
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
                    Don't have an account{" "}
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
                      type="text"
                      value={data.email}
                      required
                      className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
                      placeholder="Enter email"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-2"
                      viewBox="0 0 682.667 682.667"
                    >
                      <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                          <path d="M0 512h512V0H0Z" data-original="#000000" />
                        </clipPath>
                      </defs>
                      <g
                        clipPath="url(#a)"
                        transform="matrix(1.33 0 0 -1.33 0 682.667)"
                      >
                        <path
                          fill="none"
                          strokeMiterlimit={10}
                          strokeWidth={40}
                          d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                          data-original="#000000"
                        />
                        <path
                          d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                          data-original="#000000"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="mt-8">
                  <label className="text-gray-800 text-xs block mb-2">
                    Password
                  </label>
                  <div className="relative flex items-center ">
                    <input
                      onChange={handleChange}
                      name="password"
                      value={data.password}
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
                      placeholder="Enter password"
                    />
                    <div
                      className="absolute top-1 right-2 cursor-pointer"
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
                    className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none "
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
