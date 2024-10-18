import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  mongoBDconnect();
  console.log("Server running on Port 5000..");
});

const mongoBDconnect = () => {
  try {
    mongoose.connect(process.env.MONODB_CONNECTION).then(() => {
      console.log("Mongo DB is Connected ");
    });
  } catch (error) {
    console.log("Mongo DB is Connection failed ", error.message);
  }
};
