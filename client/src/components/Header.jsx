import React, { useState } from "react";
import { Link } from "react-router-dom"; // Ensure to use 'react-router-dom' for routing
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import logo from "../assets/headerImg.png";
import { useDispatch, useSelector } from "react-redux";
import { handleError, handleSuccess } from "./../Util";
import { ToastContainer } from "react-toastify";
import { setUser } from "../store/userSlices";
import ROLE from './../common/role';

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);

  const handleLogout = async () => {
    try {
      const fetchData = await fetch("http://localhost:3000/auth/user-logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const response = await fetchData.json();
      const { error, success, message } = response;

      if (success) {
        handleSuccess(message);
        dispatch(setUser(null)); // Clear user from Redux
        localStorage.removeItem("token"); // Log out the user

        // Delay navigation by 1 second
        setTimeout(() => {
          window.location.href = "/"; // Redirect to home page after delay
        }, 1000);
      } else if (error) {
        handleError(message); // Show error message
      }
    } catch (error) {
      handleError(
        "An error occurred while logging out. Please try again later."
      );
    }
  };

  return (
    <header className="bg-white py-1 shadow-md">
      <div className="container mx-auto h-full flex justify-between items-center px-4">
        <Link to={"/"}>
          <div className="w-20">
            <img src={logo} alt="headerImage" />
          </div>
        </Link>

        <div>
          <div className="hidden lg:flex bg-white px-1 py-1 w-[400px] rounded-full border border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif] focus-within:shadow-md">
            <input
              type="text"
              placeholder="Search Something..."
              className="w-full outline-none bg-white pl-4 text-sm"
            />
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm rounded-full px-5 py-2.5"
            >
              Search
            </button>
          </div>
        </div>

        <div className="flex gap-6 items-center text-center">
          <div
            className="relative group flex justify-center">
            {
              user?._id && (
                
            <div onClick={() => setMenu((prev) => !prev)}>
              {user?.image ? (
                <img
                  src={user?.image}
                  alt="user"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              ) : (
                <span>
                  <FaRegCircleUser size={30} />
                </span>
              )}
            </div>
              )
            }

            {menu && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role == ROLE.ADMIN && (
                    
                  <Link
                    onClick={() => setMenu((prev) => !prev)}
                    to={"/admin-panel/all-products"}
                    className="whitespace-nowrap  hidden md:block hover:bg-slate-100 p-2"
                  >
                    Admin Panel
                  </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          <Link to={"/card"}>
            <div className="relative">
              <span>
                <BsCart3 size={30} />
              </span>
              <div className="bg-red-500 absolute top-[-5px] right-[-5px] text-white p-1 w-5 h-5 flex items-center justify-center rounded-full">
                <p className=" text-xs">0</p>
              </div>
            </div>
          </Link>

          {user?._id ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-gradient-to-tr hover:bg-gradient-to-tl from-blue-700 to-blue-300"
            >
              Logout
            </button>
          ) : (
            <Link to={"/login"}>
              <button className="px-5 py-2.5 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-gradient-to-tr hover:bg-gradient-to-tl from-blue-700 to-blue-300">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      <ToastContainer />
    </header>
  );
};

export default Header;
