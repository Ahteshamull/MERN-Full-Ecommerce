const uploadProductPermission = require("../helpers/permission");
const productModel = require("../model/productModel");

const updateProduct = async (req, res) => {
  try {
    // Check if the user has permission
    if (!uploadProductPermission(req.userId || req.user._id)) {
      return res.status(400).send({
        message: "Permission denied",
        error: true,
        success: false,
      });
    }

 
     

    const { name, description, price, image, sellingPrice, cetagory, brand,_id } =
      req.body;
console.log(_id)
    // Check if the product exists
    const existingProduct = await productModel.findById(_id);
    if (!existingProduct) {
      return res.status(404).send({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    // Update the product in the database
    const updateProducts = await productModel.findByIdAndUpdate(
      _id, // Use the product ID from the params directly
      { name, description, price, image, sellingPrice, cetagory, brand }, // The fields to be updated
      { new: true } // Return the updated product
    );

    return res.status(200).send({
      message: "Product updated successfully",
      error: false,
      success: true,
      updateProducts,
    });
  } catch (error) {
    // Handle error
    return res.status(400).send({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = updateProduct;
