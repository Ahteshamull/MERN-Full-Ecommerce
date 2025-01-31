import React, { useState } from "react";
import ROLE from "../common/role";
import { FaWindowClose } from "react-icons/fa";
import { handleSuccess } from "../Util";

const ChangeUserRole = ({
  name,
  email,
  role,
  userId,
  onClose,
  callFunction,
}) => {
  const [UserRole, setUserRole] = useState(role);

  const handleOnchange = (e) => {
    setUserRole(e.target.value); // Just set the state without calling updateUserRole here
  };

  const updateUserRole = async () => {
    const response = await fetch("http://localhost:3000/auth/update-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        userId: userId, // Ensure userId is stored correctly
        role: UserRole, // Use the updated UserRole state here
      }),
    });

    const updatedUser = await response.json();

    const { success, message, error } = updatedUser;

    if (success) {
      handleSuccess(message);
      onClose();
      callFunction()
    }
  };

  return (
    <div className="top-0 left-0 fixed w-full h-full z-10 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="mx-auto p-4 border shadow-2xl border-gray-400 rounded-lg bg-white w-96">
        <form className="space-y-4">
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Change User Role
            </label>
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-700">Name: {name}</p>
              <p className="text-sm font-medium mt-2 mb-2 text-gray-700">
                Email: {email}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium mt-2 mb-2 text-gray-700">
                Role:
              </p>
              <select
                value={UserRole}
                onChange={handleOnchange}
                id="role"
                className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {Object.values(ROLE).map((el, index) => (
                  <option key={index} value={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-between gap-3 items-center">
            <button
              type="button"
              onClick={updateUserRole}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Change Role
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-red-700 outline-none bg-transparent hover:bg-red-700 text-red-700 hover:text-white transition-all duration-300"
            >
              <FaWindowClose size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeUserRole;
