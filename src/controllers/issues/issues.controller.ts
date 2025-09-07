import type { Request, Response } from "express";
import { Router } from "express";

import issuesService from "../../services/issues/issues.service.js";

const {
  createIssue,
  getAllIssues,
  deleteIssue,
  getAllAssignedIssues,
  deleteAssignedIssue,
} = issuesService;

const Issues = Router();

Issues.post("/post-issue", async (req: Request, res: Response) => {
  try {
    const user = (req as any)?.user;
    const data = req.body;
    const response = await createIssue(data, user);
    res.json(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
});

Issues.get("/get-issues", async (req: Request, res: Response) => {
  try {
    const user = (req as any)?.user;

    const page = req.query.noOfPages || 1;
    const limit = req.query.noOfRows || 5;

    const response = await getAllIssues(user, page as number, limit as number);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch issues" });
  }
});

Issues.delete("/delete-issue/:issueId", async (req: Request, res: Response) => {
  try {
    const { issueId } = req.params;
    const response = await deleteIssue(issueId as unknown as string);
    res.json(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
});

Issues.get("/get-assigned-issues", async (req: Request, res: Response) => {
  try {
    const user = (req as any)?.user;

    const page = req.query.noOfPages || 1;
    const limit = req.query.noOfRows || 5;

    const response = await getAllAssignedIssues(
      user,
      page as number,
      limit as number
    );
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch issues" });
  }
});

export default Issues;
