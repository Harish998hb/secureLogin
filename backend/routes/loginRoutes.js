import express from "express";
import {
  createUser,
  loginUser,
} from "../controller/loginController.js";

export const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

// router.get("/login", getUser);
