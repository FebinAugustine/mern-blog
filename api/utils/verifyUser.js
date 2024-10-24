import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "You are not Authorised" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "You are not Authorised" });
    }
    req.user = user;
    next();
  });
};
