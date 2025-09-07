import { Router } from "express";

import type { Request, Response } from "express";

import UserService from "../../services/user/user.service.js";
import userSchema from "../../schemas/user/user.schema.js";
import { authMiddleware } from "../../middlewares/jwtAuthValidation.js";

const User = Router();

const { handleSignup, handleLogin, getAllUsers } = UserService;

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

    const result = await handleLogin(data);

    if (result.status === false) {
      return res.status(200).json(result);
    }
    const { token, user } = result;

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 50 * 24 * 60 * 60 * 1000,
    });

    res.json({ status: true, message: "user logged in", user });
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
    secure: false,
  });

  return res.json({ message: "Logged out successfully" });
});

User.get("/get-users", async (req: Request, res: Response) => {
  const users = await getAllUsers();

  return res.json({ users });
});

export default User;
