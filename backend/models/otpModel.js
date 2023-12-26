import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const VerifyOtpModel = mongoose.model("otpVerify", otpSchema);
