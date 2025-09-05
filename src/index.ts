import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import User from "./controllers/user/index.js";

const app = express();
const PORT = 5000;
dotenv.config();
app.use(cookieParser());
const MONGO_URI =
  "mongodb+srv://waseemsultanix_db_user:MyPass123%21@issuesboard.epowywh.mongodb.net/expressDb?retryWrites=true&w=majority&appName=IssuesBoard";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/user", User);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
