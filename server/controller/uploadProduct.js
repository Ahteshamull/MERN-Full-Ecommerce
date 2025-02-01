const uploadProductPermission = require("../helpers/permission");
const productModel = require("../model/productModel");

const UploadProduct = async (req, res) => {
  const { name, description, category, brand, sellingPrice, price, image } =
    req.body;

  try {
    const SessionUserId = req.userId;
    if (!uploadProductPermission(SessionUserId)) {
      return res.status(400).send({
        message: error.message || "Permission denied",
        error: true,
        success: false,
      });
    }

    const newProduct = new productModel({
      image,
      name,
      description,
      category,
      brand,
      sellingPrice,
      price,
    });
    await newProduct.save();
    return res.status(201).send({
      success: true,
      error: false,
      message: "Product created successfully",
      newProduct,
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = UploadProduct;
