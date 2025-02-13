const uploadProductPermission = require("../helpers/permission");
const productModel = require("../model/productModel");

const UploadProduct = async (req, res) => {
   try {
     
     const SessionUserId = req.userId;
     if (!uploadProductPermission(SessionUserId)) {
       return res.status(400).send({
         message: error.message || "Permission denied",
         error: true,
         success: false,
       });
     }

            const uploadProduct = new productModel(req.body);
            const saveProduct = await uploadProduct.save();

          return  res.status(201).json({
              message: "Product upload successfully",
              error: false,
              success: true,
              data: saveProduct,
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
