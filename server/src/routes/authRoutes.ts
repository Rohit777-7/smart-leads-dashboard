import express from "express";
import {
  loginUser,
  registerUser,
} from "../controllers/authController";

import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Protected Route
router.get(
  "/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      message: "Protected Profile Route Accessed",
    });
  }
);

export default router;