import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../Util";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateUserRole, setOpenUpdateUserRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id:""
  });

  const fetchAllUser = async () => {
    try {
      const fetchData = await fetch("http://localhost:3000/auth/all-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const response = await fetchData.json();
      const { success, message, error } = response;
      if (success) {
        setAllUsers(response.data);
      } else if (error) {
        handleError(error);
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

 

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Sr.</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Create Date</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
      
            <tr key={user.sr} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{user?.name}</td>
              <td className="px-4 py-2">{user?.email}</td>
              <td className="px-4 py-2">{user?.role}</td>
              <td className="px-4 py-2">
                {moment(user.createdAt).format("Do MMMM YYYY, h:mm A")}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => {
                    setUpdateUserDetails(user);
                    setOpenUpdateUserRole(true);
                  }}
                  className="px-2 py-2 rounded-lg text-sm tracking-wider font-medium border border-current outline-none bg-transparent hover:bg-green-700 text-green-700 hover:text-white transition-all duration-300"
                >
                  <FaEdit size={22} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openUpdateUserRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateUserRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunction={fetchAllUser}
        />
      )}
    </div>
  );
};

export default AllUsers;
