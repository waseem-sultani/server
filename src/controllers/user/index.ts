import { Router } from "express";
import UserService from "../../services/user/index.js";

import type { Request, Response } from "express";

const User = Router();

const { handleUser, handleUsers } = UserService;

User.get("/", async (req: Request, res: Response) => {
  const data = handleUser();
  res.json(data);
});

User.get("/s", async (req: Request, res: Response) => {
  const data = await handleUsers();
  res.json(data);
});

export default User;
