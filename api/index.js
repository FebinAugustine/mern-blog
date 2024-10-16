import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONODB_CONNECTION)
  .then(() => {
    console.log("Mongo DB is Connected");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server running on Port 3000..");
});

// app.get("/test", (req, res) => {
//   res.json({ message: "API is working" });
// });

app.use("/api/user", userRoutes);
