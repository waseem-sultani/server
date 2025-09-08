import type { IIsue } from "../../interfaces/index.js";
import Issue from "../../schemas/issues/issues.schema.js";
import mongoose from "mongoose";

const createIssue = async (data: IIsue, user: any) => {
  try {
    const { title, description, status, priority, assignee, tags } = data;
    const { id } = user;

    await Issue.create({
      title,
      description,
      status,
      priority,
      assignee: assignee === "" ? null : assignee,
      tags,
      userId: id,
    });

    return { status: true, message: "issues is created" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllIssues = async (user: any, page: number, limit: number) => {
  try {
    const skip = (page - 1) * limit;

    const issues = await Issue.find({ userId: user?.id })
      .populate("assignee", "name")
      .skip(skip)
      .limit(limit);

    const total = await Issue.countDocuments({ userId: user?.id });

    return {
      issues,
      total,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteIssue = async (issueId: string) => {
  try {
    await Issue.findOneAndDelete({ _id: issueId });
    return { success: true, message: "issue deleted successfully" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllAssignedIssues = async (user: any, page: number, limit: number) => {
  try {
    const skip = (page - 1) * limit;

    const issues = await Issue.find({ assignee: user?.id })
      .populate("userId", "name")
      .skip(skip)
      .limit(limit);

    const total = await Issue.countDocuments({ assignee: user?.id });

    return {
      issues,
      total,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteAssignedIssue = async (issueId: string) => {
  try {
    await Issue.findOneAndDelete({ _id: issueId });
    return { success: true, message: "issue deleted successfully" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createIssue,
  getAllIssues,
  deleteIssue,
  getAllAssignedIssues,
  deleteAssignedIssue,
};
