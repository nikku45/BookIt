// src/api/bookings.ts
import { api } from "./config";

export type CreateBookingPayload = {
  experienceId: string;
  name: string;
  email: string;
  date: string;
  time: string;
  promoCode?: string | null;
  price: number; // final price to store
};

export type CreateBookingResponse = {
  referenceId: string;
  bookingId?: string;
  message?: string;
};

export const createBooking = async (payload: CreateBookingPayload) => {
  const res = await api.post<CreateBookingResponse>("/bookings", payload);
  return res.data;
};
