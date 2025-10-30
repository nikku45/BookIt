import Experience from "../models/Experience.js";
import asyncHandler from "express-async-handler";

// @desc    Get all experiences
export const getExperiences = asyncHandler(async (req, res) => {
  const exps = await Experience.find({});
  res.json(exps);
});


// @desc    Get experience by ID
export const getExperienceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const exp = await Experience.findById(id);
  if (!exp) return res.status(404).json({ message: "Experience not found" });
  res.json(exp);
});
