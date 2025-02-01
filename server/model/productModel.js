const { Schema, default: mongoose } = require("mongoose");
const ProductSchema = new Schema(
  {
    image:
      {
        type: Array,
        required: true,
      },
 
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("Product", ProductSchema);
module.exports = productModel;
