import React from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet } from "react-router";
import Dashboard from "../components/Dashboard";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  return (
    <div className="min-h-[calc(100vh-148px)] md:flex hidden">
      <aside className="bg-white w-full min-h-full max-w-60  drop-shadow-lg ">
        <div className="h-32  flex flex-col justify-center mt-5 items-center">
          <div>
            {user?.image ? (
              <img
                src={user?.image}
                alt="user"
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <span>
                <FaRegCircleUser size={30} />
              </span>
            )}
          </div>
          <p className="capitalize mt-2 text-xl font-semibold font-mono text-black">
            {user?.name}
          </p>
          <p className="text-sm select-none">{user?.role}</p>
        </div>

        {/* ===========Navigate============ */}

        <div>
          <nav className="grid p-4">
            <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">
              All Users
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">
              All Products
            </Link>
         
           
          </nav>
        </div>
      </aside>
          <main>
              
             <Dashboard/>
      </main>
    </div>
  );
};

export default AdminPanel;
