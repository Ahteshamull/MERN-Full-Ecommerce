const productModel = require("../model/productModel");

const getProduct = async (req, res) => {
  try {
    const allProducts = await productModel.find().sort({ createdAd: -1 });
    return res.status(200).send({
      success: true,
      error: false,
      message: "All Products Here",
      allProducts,
    });
  } catch (error) {
    return res.status(500).send(error.message || "Internal server error");
  }
};
module.exports = { getProduct };
