// routes/backupRoutes.js
import express from "express";
// import { restartBackup } from "../controller/backupController.js";
import { authendicate } from "../middleware/middleware.js";
import { backupUserData } from "../Helper/googleDrive.js";
import { TodolistSchema } from "../models/todolistModels.js";

const router = express.Router();

// router.post("/restartBackup", authendicate, restartBackup);
router.post("/api/restartBackup", authendicate, async (req, res) => {
  try {
    const token = req.header("Authorization");
    const userId = await getUserIdFromToken(token);

  const todos = await TodolistSchema.find({ userId });
 
     const user = await User.findById(userId);
     if (!user || !user.googleTokens) {
       return res.status(400).json({ success: false, error: "Google tokens missing" });
     }
 
     const fileId = await backupUserData(user, todos);
    return res
      .status(200)
      .json({ success: true, data: "Todo deleted successfully..!!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
})

export default router;
