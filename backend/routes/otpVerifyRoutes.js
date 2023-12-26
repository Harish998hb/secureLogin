import express from "express";
import {
  getOtp,
  resendOtp,
  verifyOtp,
} from "../controller/otpVerifyController.js";

export const router = express.Router();

router.post("/reqestOtp", getOtp);

router.post("/verifyOtp", verifyOtp);

router.post("/resendOtp", resendOtp);
