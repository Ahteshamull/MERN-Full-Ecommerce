const { Schema, default: mongoose } = require("mongoose");
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ["GENERAL", "ADMIN"],
      default: "GENERAL",
    },
  },
  {
    timeseries: true,
  }
);

const userModel = mongoose.model("User", UserSchema);
module.exports = userModel;
