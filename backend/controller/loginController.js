import { UserModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUser(req, res) {
  const { email, password, phoneNum, userName } = req.body;
  const isExistsUser = await UserModel.findOne({ email });
  if (!isExistsUser) {
    const salts = 10;
    const hashedPassword = await bcrypt.hash(password, salts);
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      phoneNum,
      userName,
    });
    await newUser.save();
    res.json({ msg: "User Profile Created" });
  } else {
    res.json({ msg: "Exisitng User Present" });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  const isUserExists = await UserModel.findOne({ email });
  console.log(isUserExists);
  if (!isUserExists) {
    res.status(401).json({ msg: "Wrong credentials Provided" });
  } else {
    const isValidPassword = await bcrypt.compare(
      password,
      isUserExists.password
    );
    console.log(isValidPassword);
    if (!isValidPassword) {
      res.status(401).send("Invalid Credentials");
    } else {
      const tokenID = jwt.sign({id:isUserExists._id}, "secret", {
        expiresIn: 1000 * 60 * 60 * 24 * 2,
      });
      return res.json({
        userID: isUserExists._id,
        token: tokenID,
      });
    }
  }
}
