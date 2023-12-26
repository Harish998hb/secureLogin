import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isOtpVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
    phoneNum: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("users", UserSchema);
