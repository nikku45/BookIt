// src/api/promo.ts
import { api } from "./config";

export type PromoValidateResponse = {
  valid: boolean;
  discountedPrice?: number;
  message?: string;
  promo?: { code: string; discountType: "percent" | "flat"; value: number };
};

export const validatePromo = async (code: string, price: number) => {
  const res = await api.post<PromoValidateResponse>("/promo/validate", {
    code,
    price,
  });
  return res.data;
};
