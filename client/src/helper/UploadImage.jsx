const Url = `https://api.cloudinary.com/v1_1/dgvc0jaao/image/upload`;

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "ECommerce-images");

  try {
    const dataResponse = await fetch(Url, {
      method: "POST",
      body: formData,
    });

    
    if (!dataResponse.ok) {
      throw new Error("Error uploading image");
    }

    const data = await dataResponse.json();

  
    return data; 
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error; 
  }
};

export default uploadImage;



  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setLoading(true);
  //     const formData = new FormData();
  //     formData.append("name", productDetails.name);
  //     formData.append("description", productDetails.description);
  //     formData.append("price", productDetails.price);
  //     formData.append("category", productDetails.category);
  //     if (image) formData.append("image", image);

  //     try {
  //       const response = await fetch("http://localhost:3000/products", {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //         body: formData,
  //       });

  //       const data = await response.json();

  //       if (data.success) {
  //         setSuccessMessage("Product uploaded successfully!");
  //         setProductDetails({
  //           name: "",
  //           description: "",
  //           price: "",
  //           category: "",
  //         });
  //         setImage(null);
  //       } else {
  //         setErrorMessage(data.error || "An error occurred.");
  //       }
  //     } catch (error) {
  //       setErrorMessage("Error uploading the product.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };