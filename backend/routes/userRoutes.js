import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
 
} from "../controllers/userController.js";
import { protect } from "../../middleware/authMiddleware.js";
router.post("/signup", registerUser);
router.post("/",authUser);
router.post('/logout',logoutUser);
router.get("/profile",protect,getUserProfile)
router.put("/profile",protect,updateUserProfile)

export default router;
   