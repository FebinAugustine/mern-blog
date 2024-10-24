import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({ message: "New router + added controller" });
};

export const updateUserProfile = async (req, res) => {
  if (req.user.id !== req.params.userId) {
    return res
      .status(401)
      .json({ success: false, message: "You are not Authorised to update" });
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 6 characters",
      });
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.userName) {
    if (req.body.userName.length < 7 || req.body.userName.length > 20) {
      return res.status(400).json({
        success: false,
        message: "User Name must between 7 and 20 characters in length",
      });
    }

    if (req.body.userName.includes(" ")) {
      return res.status(400).json({
        success: false,
        message: "Spaces are not allowed in username",
      });
    }

    if (req.body.userName !== req.body.userName.toLowerCase()) {
      return res.status(400).json({
        success: false,
        message: "Username must not contain uppercase",
      });
    }

    if (!req.body.userName.match(/^[a-zA-Z0-9]+$/)) {
      return res.status(400).json({
        success: false,
        message: "Username must  contain only alphabets or numbers",
      });
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            profilePic: req.body.profilePic,
          },
        },
        { new: true }
      );

      const { password, ...rest } = updatedUser._doc;
      return res.status(200).json(rest);
    } catch (error) {
      return error;
    }
  }
  console.log(req.user);
};
