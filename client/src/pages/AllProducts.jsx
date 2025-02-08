import React, { useEffect, useState } from "react";

import UploadProduct from "./../components/UploadProducts";
import axios from "axios";

import AdminProductCart from "../components/AdminProductCart";

const AllProducts = () => {
  const [uploadProduct, setUploadProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const allProducts = async () => {
    const response = await axios.get(
      "http://localhost:3000/product/all/products",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setProducts(response.data.allProducts);
  };

  useEffect(() => {
    allProducts();
  }, []);
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg ">All Products</h2>
        <button
          onClick={() => setUploadProduct(true)}
          className="px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-blue-700 outline-none bg-transparent hover:bg-blue-700 text-blue-700 hover:text-white transition-all duration-300"
        >
          Upload Products
        </button>
      </div>

      <div className="flex gap-5 items-center py-4">
        {products.map((item, index) => (
          <AdminProductCart
            data={item}
            key={index + "allProducts"}
            fetchData={allProducts}
          />
        ))}
      </div>

      {uploadProduct && (
        <UploadProduct onClose={() => setUploadProduct(false)} />
      )}
      {/* <UploadProduct/> */}
    </div>
  );
};

export default AllProducts;
