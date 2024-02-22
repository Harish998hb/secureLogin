import { VerifyOtpModel } from "../models/otpModel.js";
import { UserModel } from "../models/userModel.js";
import nodemailer from "nodemailer";

import bcrypt from "bcrypt";

// Creating the SMPT transport
const mailConfigure = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GUSER,
    pass: process.env.GPASS,
  },
};

const mailTransport = nodemailer.createTransport(mailConfigure);

export async function getOtp(req, res) {
  const { userId } = req.body;
  const userExists = await UserModel.findById({ _id: userId });
  if (userExists) {
    // Generating Otp
    const otp = Math.floor(Math.random() * 9000 + 1000);
    console.log(otp);
    // Math.random() * 9000 here we can get numbers between 0 - 9000 and there is a possibility of getting 1,2,3 digit number so here we are adding 1000 to it to ensure it has 4 digit number

    // Storing the otp in the database
    const salts = 10;
    const hashedOtp = await bcrypt.hash(otp.toString(), salts);
    const newotpRecord = new VerifyOtpModel({
      userId,
      otp: hashedOtp,
      expiresAt: new Date() + 1000 * 15,
    });
    await newotpRecord.save();
    // Send the otp to the users email using nodemailer
    const mailOptions = {
      from: process.env.GUSER,
      to: [userExists.email],
      subject: "Hola Mate",
      html: `<h1>Mate Are you there? ${otp}</h1>`,
    };
    mailTransport.sendMail(mailOptions, (err) => {
      if (err) console.log(err);
      else console.log("Mail send successfully");
    });
    res.json({ msg: "OTP Has been send to the registed email" });
  } else return res.status(404).json({ error: "No Such User Found" });
}

export async function verifyOtp(req, res) {
  const { userId, otp } = req.body;
  const userExists = await UserModel.findById({ _id: userId });
  if (!userExists) return res.send("No Such User Found");

  // Verification for Otp
  const otpArray = await VerifyOtpModel.find({ userId });
  if (otpArray.length <= 0) return res.send("No OTP records found");

  // First to verify whether otp has expired or not
  const expiresAt = otpArray[0].expiresAt;
  if (!(Date.now() > expiresAt)) {
    await VerifyOtpModel.deleteMany({ _id: userId });
    return res.send("Otp has been expired");
  }
  // Verify Otp with DB
  const lastOtpEntry = otpArray[otpArray.length - 1];
  const verified = await bcrypt.compare(otp, lastOtpEntry.otp);

  if (verified) {
    await UserModel.updateOne({ _id: userId }, { isOtpVerified: true });
    await VerifyOtpModel.deleteMany({ userId });
    return res.status(200).json({ status: "OTP verified" });
  } else return res.status(401).json({ error: "Invalid Otp" });
}

export async function resendOtp(req, res) {
  const { userId } = req.body;
  await VerifyOtpModel.deleteMany({ userId });
  getOtp(req, res);
}
