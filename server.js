// ======================================================
// ENVIRONMENT
// ======================================================

import "dotenv/config";

// ======================================================
// IMPORTS
// ======================================================

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import { TodolistSchema } from "./src/models/todolistModels.js";
import { scheduleAlarm } from "./src/Helper/alarm.js";
import "./src/config/db.js"; // ensures DB + GridFSBucket initialized
import { initiateApp } from "./src/helper/apiHelper.js";

import { seed } from "./src/routes/seedTemplates.js";
import { languageMiddleware } from "./src/middleware/languageMiddleware.js";
import i18n from "./src/config/i18n.js";

// ======================================================
// ERROR HANDLING
// ======================================================

process.on("uncaughtException", (error) => {
  console.error("");
  console.error("❌ UNCAUGHT EXCEPTION");
  console.error(error);
  console.error("");
});

process.on("unhandledRejection", (reason) => {
  console.error("");
  console.error("❌ UNHANDLED REJECTION");
  console.error(reason);
  console.error("");
});

// ======================================================
// EXPRESS APP
// ======================================================

const app = express();
app.get("/api/userLoginOrLogout1", (req, res) => {
  res.send("Login route works!");
});

const port = Number(process.env.PORT) || 5001;

// ======================================================
// CORS
// ======================================================
// Attach i18n
app.use(i18n.init);

// Attach language middleware
app.use(languageMiddleware);
// ✅ Place your welcome route here
app.get("/api/welcome", (req, res) => {
  i18n.setLocale("ta"); // set locale per user
  i18n.setLocale(req.language);

  return res.status(200).json({ success: true, message: i18n.__("welcome") });
});

app.use(
  cors({
    origin: "*",

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// ======================================================
// BODY PARSER
// ======================================================

app.use(
  express.json({
    limit: "50mb",
  }),
);

app.use(
  bodyParser.json({
    limit: "50mb",
  }),
);

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  }),
);

// ======================================================
// EXISTING API ROUTES
// ======================================================

initiateApp(app);

// ======================================================
// INITIATE REMINDER
// ======================================================

const initAlarms = async () => {
  console.log("Reminder Check");
  const tasks = await TodolistSchema.find({ alarm: { $ne: null } });
  tasks.forEach((task) => scheduleAlarm(task));
};
initAlarms();
// ======================================================
// Seed Templated
// ======================================================
seed();
// ======================================================
// HTTP SERVER
// ======================================================

const server = http.createServer(app);

// ======================================================
// START HTTP SERVER FIRST
// ======================================================

server.listen(
  port,
  "0.0.0.0",

  () => {
    console.log("");

    console.log("======================================");

    console.log("🚀 CHAT SERVER STARTED");

    console.log("======================================");

    console.log(`PORT: ${port}`);

    console.log(`LOCAL: http://192.168.1.8:${port}`);

    console.log(`LAN: http://192.168.1.8:${port}`);

    // ------------------------------------------
    // UPLOAD
    // ------------------------------------------

    console.log(`UPLOAD: http://192.168.1.8:${port}/uploads/`);

    console.log(`UPLOAD TEST: http://192.168.1.8:${port}/api/upload-test`);

    console.log(`MEDIA API: http://192.168.1.8:${port}/api/upload-media`);

    console.log("======================================");

    console.log("");
  },
);

// ======================================================
// GRACEFUL SHUTDOWN
// ======================================================

const shutdown = async (signal) => {
  console.log("");
  console.log(`🛑 ${signal} received. Shutting down...`);

  try {
    // Stop accepting new HTTP connections
    server.close(() => {
      console.log("✅ HTTP server closed");
    });

    // Close MongoDB
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();

      console.log("✅ MongoDB connection closed");
    }

    console.log("✅ Server shutdown complete");

    process.exit(0);
  } catch (error) {
    console.error("❌ Shutdown error:", error);

    process.exit(1);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));

process.on("SIGTERM", () => shutdown("SIGTERM"));
