const uploadProductPermission = require("../helpers/permission");
const productModel = require("../model/productModel");

const updateProduct = async (req, res) => {
  try {
    // Check if the user has permission to update the product
    if (!uploadProductPermission(req.userId)) {
      return res.status(403).json({
        message: "Permission denied",
        error: true,
        success: false,
      });
    }

    // Destructure _id and other fields from the request body
    const { _id, ...resBody } = req.body;

    // Find and update the product by its ID
    const updatedProduct = await productModel.findByIdAndUpdate(_id, resBody, {
      new: true,
    });

    // If the product is not found, return an error
    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    // Return success response with the updated product
    res.json({
      message: "Product updated successfully",
      updatedProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    // Catch and handle any errors that occur
    return res.status(400).send({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = updateProduct;
