import React, { useState } from "react";
import { FaRegWindowClose, FaCloudUploadAlt } from "react-icons/fa";
import ProductCetagory from "../helper/ProductCetagory";
import UploadImage from "../helper/UploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";

const UploadProduct = ({ onClose }) => {
  const [data, setData] = useState({
    name: "",
    description: "",
    brand: "",
    price: 0,
    sellingPrice: "",
    category: "",
    image: [],
  });
const [openFullScreen,setOpenFullScreen] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
   

    try {
      const uploadProductCloudinary = await UploadImage(file);

      setData((prevData) => ({
        ...prevData,
        image: [...prevData.image, uploadProductCloudinary.secure_url], // Store the uploaded image URL
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleDeleteImage = async(index) => { 
    const newProductImage = [...data.image]
    newProductImage.splice(index, 1)
    setData((prevData) => ({
      ...prevData,
      image: [ ...newProductImage], // Store the uploaded image URL
    }));
  }

  return (
    <div className="fixed w-full top-0 left-0 h-full mx-auto flex items-center justify-center p-4 bg-slate-200 bg-opacity-35 rounded-lg shadow-md overflow-hidden">
      <div className="bg-white p-4 w-full rounded max-w-2xl h-full max-h-[80%] ">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-medium">Upload Product :</h2>
          </div>
          <div
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium outline-none bg-transparent hover:bg-red-700 text-red-700 hover:text-white transition-all duration-300"
          >
            <FaRegWindowClose size={20} />
          </div>
        </div>
        <form className="overflow-y-scroll h-full pb-5">
          {/* Product Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="name"
              name="name"
              placeholder="Enter the product name"
              value={data.name}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Product Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Product Description
            </label>
            <textarea
              onChange={handleChange}
              id="description"
              name="description"
              placeholder="Enter the product description"
              value={data.description}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            ></textarea>
          </div>

          {/* Product Brand */}
          <div className="mb-4">
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Product Brand
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="brand"
              name="brand"
              placeholder="Enter the product brand"
              value={data.brand}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Product Price */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Product Price
            </label>
            <input
              onChange={handleChange}
              type="number"
              id="price"
              name="price"
              placeholder="Enter the product price"
              value={data.price}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Selling Price */}
          <div className="mb-4">
            <label
              htmlFor="sellingPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Selling Price
            </label>
            <input
              onChange={handleChange}
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              placeholder="Enter the product Selling Price"
              value={data.sellingPrice}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Product Category */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Product Category
            </label>
            <select
              onChange={handleChange}
              value={data.category}
              name="category"
            >
              {ProductCetagory.map((item, index) => (
                <option value={item.value} key={item.value + index}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Product Image */}
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Product Image
            </label>
            <label htmlFor="uploadImageInput">
              <div className="p-2 bg-slate-200 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                <div className="text-slate-500 flex-col gap-2 flex justify-center items-center">
                  <FaCloudUploadAlt size={40} />
                  <p className="text-sm">Upload Product Image ...!</p>
                  <input
                    onChange={handleUploadProduct}
                    className="hidden"
                    type="file"
                    id="uploadImageInput"
                  />
                </div>
              </div>
            </label>
            <div className="">
              {data?.image.length > 0 ? (
                <div className="flex items-start gap-2 ">
                  {data.image.map((img, index) => (
                    <div className="relative group ">


                      <img
                        onClick={() => {
                          setOpenFullScreen(true);
                          setFullScreenImage(img);
                        }}
                        key={index}
                        src={img}
                        width={80}
                        height={80}
                        alt={`Uploaded Product ${index}`}
                        className="bg-slate-100 border cursor-pointer"
                      />
                      <div
                      onClick={()=>handleDeleteImage(index)}
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-500 rounded-full hidden group-hover:block cursor-pointer">
                      <MdDelete/>

                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-red-400 text-xs">
                  ** Please Upload Product Images
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Upload
            </button>
          </div>
        </form>
      </div>

      {/* Close Button */}

      {openFullScreen && (
        <DisplayImage
          onClose={() => setOpenFullScreen(false)} // Corrected here
          imageUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
