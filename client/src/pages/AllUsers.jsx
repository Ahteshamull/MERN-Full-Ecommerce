import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../Util";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
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
      // if (success) {
      //   handleSuccess(message);
      // }
      // if (!success) {
      //   handleError(message);
      // }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    fetchAllUser();
  }, []);
  return (
    <div className="bg-white pb-4">
   
        <table className="w-full">
          <thead className="bg-white">
            <th className=" border text-base font-medium">Sr.</th>
            <th className=" border text-base font-medium">Sr.</th>
            <th className=" border text-base font-medium">Sr.</th>
            <th className=" border text-base font-medium">Sr.</th>
            <th className=" border text-base font-medium">Sr.</th>
          </thead>
        </table>
      </div>
  
  );
};

export default AllUsers;
