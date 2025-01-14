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
    },
    profileImage: {
      type: String,
    },
  },
  {
    timeseries: true,
  }
);

const userModel = mongoose.model("User", UserSchema)
module.exports = userModel
