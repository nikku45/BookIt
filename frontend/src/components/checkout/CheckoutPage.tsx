// src/components/checkout/CheckoutPage.tsx
import React, { useEffect,  useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type{ Experience, Slot } from "../../types";
import { validatePromo } from "../../api/promo";
import { createBooking } from "../../api/booking";

type LocationState = {
  experience: Experience;
  selectedDate: string;
  selectedTime: string;
  slot?: Slot;
};

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | undefined;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState<{ code: string; discountedPrice: number } | null>(null);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [loadingPromo, setLoadingPromo] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  if (!state) return null;

  const { experience, selectedDate, selectedTime } = state;

  // base price
  const basePrice = experience.price;

  // final price computed: if promo applied use that discounted price
  const finalPrice = promoApplied ? promoApplied.discountedPrice : basePrice;

  // promo apply function
  const handleApplyPromo = async () => {
    if (!promo) {
      setPromoMessage("Enter a promo code to apply.");
      return;
    }
    setPromoMessage(null);
    setLoadingPromo(true);
    try {
      const res = await validatePromo(promo.toUpperCase(), basePrice);
      if (!res.valid) {
        setPromoMessage(res.message || "Invalid promo code");
        setPromoApplied(null);
      } else {
        setPromoApplied({ code: promo.toUpperCase(), discountedPrice: Math.max(0, Math.round(res.discountedPrice || basePrice)) });
        setPromoMessage("Promo applied!");
      }
    } catch (err) {
      console.error(err);
      setPromoMessage("Failed to validate promo. Try again.");
    } finally {
      setLoadingPromo(false);
    }
  };

  const handleConfirmBooking = async () => {
    setErrorMsg(null);
    if (!name || !email) {
      setErrorMsg("Please fill name and email.");
      return;
    }
    setSubmitting(true);

    try {
      const payload = {
        experienceId: experience._id,
        name,
        email,
        date: selectedDate,
        time: selectedTime,
        promoCode: promoApplied?.code ?? undefined,
        price: finalPrice,
      };

      const res = await createBooking(payload);
      // Expect backend to return referenceId (and maybe bookingId)
      navigate("/confirmation", {
        state: {
          referenceId: res.referenceId,
          booking: {
            experienceTitle: experience.title,
            date: selectedDate,
            time: selectedTime,
            name,
            email,
            price: finalPrice,
            promoApplied: promoApplied?.code ?? null,
          },
        },
      });
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.response?.data?.message || "Booking failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold">{experience.title}</h2>
        {/* <p className="text-sm text-gray-600">{experience.location}</p> */}
        <p className="mt-2">Date: <strong>{selectedDate}</strong></p>
        <p>Time: <strong>{selectedTime}</strong></p>
        <p className="mt-2">Base Price: <strong>₹{basePrice}</strong></p>
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-2">Your details</h3>
        <input className="w-full mb-2 p-2 border rounded" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full mb-2 p-2 border rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-2">Promo Code</h3>
        <div className="flex gap-2">
          <input className="flex-1 p-2 border rounded" placeholder="Enter promo code" value={promo} onChange={(e) => setPromo(e.target.value)} />
          <button onClick={handleApplyPromo} disabled={loadingPromo} className="px-4 py-2 bg-blue-600 text-white rounded">
            {loadingPromo ? "Applying..." : "Apply"}
          </button>
        </div>
        {promoMessage && <p className="text-sm mt-2 text-gray-600">{promoMessage}</p>}
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-2">Price Summary</h3>
        <div className="flex justify-between">
          <span>Base price</span>
          <span>₹{basePrice}</span>
        </div>
        {promoApplied && (
          <div className="flex justify-between text-green-700">
            <span>Promo ({promoApplied.code})</span>
            <span>-₹{basePrice - promoApplied.discountedPrice}</span>
          </div>
        )}
        <div className="mt-2 border-t pt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{finalPrice}</span>
        </div>
      </div>

      {errorMsg && <p className="text-red-600 mt-3">{errorMsg}</p>}

      <div className="mt-6 flex gap-3">
        <button onClick={handleConfirmBooking} disabled={submitting} className="flex-1 bg-green-600 text-white py-3 rounded">
          {submitting ? "Confirming..." : "Confirm & Pay"}
        </button>
        <button onClick={() => navigate(-1)} className="px-4 py-3 border rounded">Back</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
