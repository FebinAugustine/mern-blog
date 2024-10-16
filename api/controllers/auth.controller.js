import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  console.log(req.body);

  const { userName, email, password } = req.body;

  if (
    !userName ||
    !email ||
    !password ||
    userName === "" ||
    email === "" ||
    password === ""
  ) {
    console.log("All fields are required");
    return res.status(404).json({ message: "All fields are required" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ userName, email, password: hashedPassword });

  try {
    await newUser.save();

    res.json("SignUp Successful");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};