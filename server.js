import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import serverless from "serverless-http";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

// Load env vars
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// MongoDB connection
connectToMongoDB().catch(err =>
  console.error("MongoDB connection error:", err)
);

// Export as handler for Vercel
export const handler = serverless(app);

// For local testing (optional)
export default app;