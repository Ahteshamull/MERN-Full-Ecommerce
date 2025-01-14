import React from "react";
import { Link } from "react-router";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import logo from "../assets/headerImg.png";

const Header = () => {
  return (
    <header className="bg-white py-1 shadow-md">
      <div className="container mx-auto h-full flex justify-between items-center px-4">
        <Link to={"/"}>
          <div className=" w-20">
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
        <div className="flex gap-6 items-center text-center ">
          <Link to={"/contact"}>
            <div>
              <span>
                <FaRegCircleUser size={30} />
              </span>
            </div>
          </Link>
          <Link to={"/card"}>
            <div className="relative">
              <span>
                <BsCart3 size={30} />
              </span>
              <div className="bg-red-500 absolute top-[-5px] right-[-5px] text-white p-1 w-5 h-5 flex items-center justify-center rounded-full">
                <p className=" text-xs ">0</p>
              </div>
            </div>
          </Link>
          <Link to={"/login"}>
            <div>
              <button className="px-5 py-2.5 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-gradient-to-tr hover:bg-gradient-to-tl from-blue-700 to-blue-300">
                Login
              </button>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
