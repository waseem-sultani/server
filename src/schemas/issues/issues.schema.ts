import mongoose from "mongoose";

const issuesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["open", "in_progress", "done", ""],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", ""],
      default: "medium",
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      default: null,
    },
    tags: { type: [String], default: [] },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Issue = mongoose.model("Issue", issuesSchema);

export default Issue;
