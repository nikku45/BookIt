import asyncHandler from "express-async-handler";
import Experience from "../models/Experience.js";
import Booking from "../models/Booking.js";
import generateRefId from "../Utils/generateRefID.js";

/*
Create booking flow:
1. Validate input.
2. Attempt atomic update on the Experience slots to decrement availableSlots if > 0.
3. If update succeeded, create Booking record with pricePaid and refId.
*/

export const createBooking = asyncHandler(async (req, res) => {
  const { name, email, experienceId, date, time, promoCode, price } = req.body;

  if (!name || !email || !experienceId || !date || !time || price == null) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Step 1: find the experience slot and decrement availableSlots


  const filter = {
    _id: experienceId,
    slots: {
      $elemMatch: {
        date,
        time,
        availableSlots: { $gt: 0 }
      }
    }
  };

  const update = {
    $inc: { "slots.$.availableSlots": -1 }
  };

  const options = { new: true };
  const updatedExperience = await Experience.findOneAndUpdate(filter, update, options);

  if (!updatedExperience) {
    return res.status(400).json({ message: "Slot not available or already sold out" });
  }

  // Step 2: create booking

  const refId = generateRefId();
  const booking = await Booking.create({
    experienceId,
    name,
    email,
    date,
    time,
    promoCode: promoCode ? promoCode.toUpperCase() : undefined,
    pricePaid: price,
    referenceId: refId
  });

  res.status(201).json({
    message: "Booking successful",
    referenceId: refId,
    bookingId: booking._id
  });
});
