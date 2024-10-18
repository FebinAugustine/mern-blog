import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "User with email already exist" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ userName, email, password: hashedPassword });

    await newUser.save();
    return res
      .status(200)
      .json({ success: true, message: "Registration success" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Registration failed" });
  }
};
