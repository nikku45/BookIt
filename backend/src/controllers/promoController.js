import Promo from "../models/Promo.js";
import asyncHandler from "express-async-handler";

export const validatePromo = asyncHandler(async (req, res) => {
  const { code, price } = req.body;
  if (!code) return res.status(400).json({ valid: false, message: "Promo code required" });

  const promo = await Promo.findOne({ code: code.toUpperCase() });
  if (!promo) return res.status(200).json({ valid: false });

  if (promo.expiresAt && promo.expiresAt < new Date()) {
    return res.status(200).json({ valid: false, message: "Promo expired" });
  }

  let discountedPrice = price;
  if (promo.discountType === "percent") {
    discountedPrice = price - (price * promo.value) / 100;
  } else {
    discountedPrice = price - promo.value;
  }
  if (discountedPrice < 0) discountedPrice = 0;

  res.json({ valid: true, discountedPrice, promo: { code: promo.code, discountType: promo.discountType, value: promo.value } });
});
