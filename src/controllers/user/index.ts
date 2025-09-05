import { Router } from "express";

import type { Request, Response } from "express";

import UserService from "../../services/user/index.js";
import { authMiddleware } from "../../middlewares/user/jwtAuthentication.js";
import userSchema from "../../schemas/user/user.schema.js";

const User = Router();

const { handleSignup, handleLogin } = UserService;

User.post("/signup", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log("Data:", data);
    const response = await handleSignup(data);
    res.json(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
});

User.post("/login", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log("Data:", data);
    const response = await handleLogin(data);

    res.cookie("token", response, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 60 * 60 * 1000,
    });

    res.json({ state: true, message: "user logged in" });
  } catch (error) {
    console.error(error);
    throw error;
  }
});

User.get("/me", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = (req as any).user;
    const user = await userSchema.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    throw error;
  }
});

User.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  return res.json({ message: "Logged out successfully" });
});

export default User;
