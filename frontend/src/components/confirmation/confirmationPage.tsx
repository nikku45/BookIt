// src/components/confirmation/ConfirmationPage.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

type State = {
  referenceId: string;
  booking: {
    experienceTitle: string;
    date: string;
    time: string;
    name: string;
    email: string;
    price: number;
    promoApplied?: string | null;
  };
};

const ConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as State | undefined;

  if (!state) {
    return (
      <div className="max-w-xl mx-auto p-8">
        <p>No booking information found.</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  const { referenceId, booking } = state;

  return (
    <div className="max-w-xl mx-auto p-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-green-600">Booking Confirmed!</h1>
        <p className="mt-2">Reference: <strong>{referenceId}</strong></p>

        <div className="mt-4">
          <p><strong>Experience:</strong> {booking.experienceTitle}</p>
          <p><strong>Date:</strong> {booking.date}</p>
          <p><strong>Time:</strong> {booking.time}</p>
          <p><strong>Name:</strong> {booking.name}</p>
          <p><strong>Email:</strong> {booking.email}</p>
          <p className="mt-2"><strong>Paid:</strong> ₹{booking.price}</p>
          {booking.promoApplied && <p><strong>Promo:</strong> {booking.promoApplied}</p>}
        </div>

        <div className="mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
