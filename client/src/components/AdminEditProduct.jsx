import React, { useState, useEffect } from "react";
import { FaRegWindowClose, FaCloudUploadAlt } from "react-icons/fa";
import ProductCetagory from "../helper/ProductCetagory";
import UploadImage from "../helper/UploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { handleSuccess } from "./../Util";

const AdminEditProduct = ({ onClose, data, fetchData }) => {
  const [openFullScreen, setOpenFullScreen] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  // Initialize state with prop `data` if available, otherwise default to empty values for adding
  const [formData, setFormData] = useState({
    _id: data?._id || "", // Empty for add
    image: data?.image || [],
    name: data?.name || "",
    description: data?.description || "",
    category: data?.category || "",
    brand: data?.brand || "",
    price: data?.price || "",
    sellingPrice: data?.sellingPrice || "",
  });

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    try {
      const uploadProductCloudinary = await UploadImage(file);

      if (uploadProductCloudinary?.secure_url) {
        setFormData((prevData) => ({
          ...prevData,
          image: [...prevData.image, uploadProductCloudinary.secure_url],
        }));
      } else {
        handleError("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      handleError("Image upload failed");
    }
  };

  // Handle image deletion
  const handleDeleteImage = (index) => {
    const newProductImage = [...formData.image];
    newProductImage.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      image: newProductImage,
    }));
  };

  // Submit the form to either update or create the product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = data ? "update/products" : "add/products"; // Use different endpoints for add/update
      const method = data ? "post" : "post"; // You can use a different method for "add" if needed

      // Ensure the _id is included for update, otherwise it will be added in the backend
      const updatedFormData = {
        ...formData,
        _id: formData._id || undefined, // Only include _id for update
      };

      const response = await axios.post(
        `http://localhost:3000/product/update/products`, // Dynamic URL for adding or updating
        updatedFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const result = response.data;
      console.log(result);
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message); // Handle success notification
        fetchData(); // Refresh data after update or add
        setTimeout(() => {
          onClose(); // Close modal after successful operation
        }, 1000);
      } else if (error) {
        handleError(
          error.details?.[0]?.message || error || "Something went wrong!"
        );
      }
    } catch (err) {
      const { response } = err;
      if (response && response.data) {
        const { error, success, message } = response.data;
        if (success) {
          handleSuccess(message);
        } else {
          handleError(message || "An unexpected error occurred.");
        }
      } else {
        handleError("Network or server error.");
      }
    }
  };

  // Display error messages using toast
  const handleError = (message) => {
    toast.error(message);
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-teal-500 flex justify-center items-center">
      <div className="fixed w-full top-0 left-0 h-full mx-auto flex items-center justify-center p-4 bg-slate-200 bg-opacity-35 rounded-lg shadow-md overflow-hidden">
        <div className="bg-white p-10 w-full rounded max-w-2xl h-full max-h-[80%]">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-medium">
                {data ? "Edit Product" : "Add New Product"}
              </h2>
            </div>
            <div
              onClick={onClose}
              className="px-2 py-1 rounded-lg text-sm tracking-wider font-medium outline-none bg-transparent hover:bg-red-700 text-red-700 hover:text-white transition-all duration-300"
            >
              <FaRegWindowClose size={20} />
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="overflow-y-scroll h-full pb-8"
          >
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
                {formData?.image.length > 0 ? (
                  <div className="flex items-start gap-2 mt-2 ">
                    {formData.image.map((img, index) => (
                      <div className="relative group" key={index}>
                        <img
                          onClick={() => {
                            setOpenFullScreen(true);
                            setFullScreenImage(img);
                          }}
                          src={img || "default-image.jpg"}
                          width={80}
                          height={80}
                          alt={`Uploaded Product ${index}`}
                          className="bg-slate-100 border cursor-pointer"
                        />
                        <div
                          onClick={() => handleDeleteImage(index)}
                          className="absolute bottom-0 right-0 p-1 text-white bg-red-500 rounded-full hidden group-hover:block cursor-pointer"
                        >
                          <MdDelete />
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

            {/* Product Name */}
            {/* Other fields like description, price, category, brand, etc. remain the same */}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                {data ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>

        {/* Full-Screen Image Modal */}
        {openFullScreen && (
          <DisplayImage
            onClose={() => setOpenFullScreen(false)}
            imageUrl={fullScreenImage}
          />
        )}
      </div>
    </div>
  );
};

export default AdminEditProduct;
