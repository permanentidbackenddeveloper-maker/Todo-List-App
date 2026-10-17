// src/routes/translationRoutes.js
import express from "express";
import { v2 } from "@google-cloud/translate";
const router = express.Router();

const translate = new v2.Translate({ projectId: "YOUR_PROJECT_ID" });

// Protected route
router.post("/api/translate/english", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "text is required" });
    }
    const [translation] = await translate.translate(text, "en");

    return res
      .status(200)
      .json({
        success: true,
        original: text,
        translated: translation,
        targetLanguage: "en",
      });
  } catch {}
});

export default router;
