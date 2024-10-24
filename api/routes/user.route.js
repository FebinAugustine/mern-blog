import express from "express";
import { test, updateUserProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// router.get("/test", (req, res) => {
//   res.json({ message: "New router" });
// });

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUserProfile);

export default router;
