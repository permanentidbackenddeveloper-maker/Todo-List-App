import { UserLoginCredentials } from "../models/loginModels.js";
import { getUserIdFromToken } from "../Helper/helper.js";

export const languageMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  console.log("token", token);

  if (token) {
    try {
      const decoded = await getUserIdFromToken(token); 
      // decoded should be { userId: "1234" } if that's how you store it

      const userData = await UserLoginCredentials.findOne({ userId: decoded });
      console.log("userData.language:", userData?.language);

      req.language = userData?.language || "en"; // fallback
      console.log("req.language set to:", req.language);
    } catch (err) {
      req.language = "en"; // fallback
      console.log("Error in middleware:", err.message);
      return res.status(500).json({ success: false, error: err.message });
    }
  } else {
    req.language = "en"; // fallback if no token
    console.log("No token, defaulting to en");
  }
  next();
};
