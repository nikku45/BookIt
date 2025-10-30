import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  date: { type: String, required: true },   // ISO date string or '2025-11-20'
  time: { type: String, required: true },   // '09:00', 'Morning', etc.
  totalSlots: { type: Number, required: true, default: 1 },
  availableSlots: { type: Number, required: true, default: 1 }
}, { _id: false });

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  location: String,
  price: { type: Number, required: true },
  slots: [slotSchema],
}, { timestamps: true });

export default mongoose.model("Experience", experienceSchema);
