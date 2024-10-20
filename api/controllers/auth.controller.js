import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
// import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return res
      .status(400)
      .json({ success: false, message: "All Fields are required." });
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password Incorrect" });
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const { password: pass, ...rest } = validUser._doc;

    return res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Invalid Password" });
  }
};

export const google = async (req, res) => {
  const { userName, email, googlePhotoURL } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (validUser) {
      const token = jwt.sign(
        { id: validUser._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      const { password: pass, ...rest } = validUser._doc;
      return res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        userName:
          userName.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email: email,
        password: hashedPassword,
        profilePic: googlePhotoURL,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      const { password: pass, ...rest } = newUser._doc;
      return res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Invalid Password" });
  }
};
