import React, { useState } from "react";
import { TiEdit } from "react-icons/ti";
import AdminEditProduct from "../components/AdminEditProduct";
const AdminProductCart = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div>
      <div className="bg-gray-100 p-4 rounded">
        <img
          src={data?.image[0]}
          width={100}
          height={100}
          alt="Products Image"
        />
        <h1 className="text-sm mt-2 font-normal text-center capitalize">
          {data.name}
        </h1>
        <div className="w-fit mt-2 ml-auto ">
          <TiEdit
            onClick={() => setEditProduct(true)}
            size={20}
            className="px-1 py-1 rounded-lg  tracking-wider cursor-pointer font-medium border border-green-700 outline-none bg-transparent hover:bg-green-700 text-green-700 hover:text-white transition-all duration-300"
          />
        </div>
        {editProduct && (
          <AdminEditProduct
            productData={data}
            fetchData={fetchData}
            onClose={() => setEditProduct(false)}
            />
          )}
          {console.log(data)}
      </div>
    </div>
  );
};

export default AdminProductCart;
