import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";
import { router as userRoute } from "./routes/loginRoutes.js";
import { router as otpVerifyRoute } from "./routes/otpVerifyRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

// API Routes
app.use(userRoute);
app.use(otpVerifyRoute);

const port = process.env.PORT;
const username = process.env.ACCOUNTHOLDER;
const password = process.env.PASS;
app.listen(port, () => {
  console.log("Server started on port ", port);
});

// Database Connection
const connectionString = `mongodb+srv://${username}:${password}@cluster0.iajehm1.mongodb.net/secure_login?retryWrites=true&w=majority`;
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Successfully Connected to database");
  })
  .catch((err) => {
    console.error(err);
  });
