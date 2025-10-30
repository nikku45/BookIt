import mongoose from "mongoose";

const promoSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ["percent", "flat"], required: true },
  value: { type: Number, required: true }, // percent (e.g., 10) or flat amount
  expiresAt: Date
});

export default mongoose.model("Promo", promoSchema);
