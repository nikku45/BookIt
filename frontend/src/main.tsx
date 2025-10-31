// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import HomePage from "./components/home/HomePage";
import DetailPage from "./components/detail/DetailPage";
import CheckoutPage from "./components/checkout/CheckoutPage";
import ConfirmationPage from "./components/confirmation/confirmationPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/experiences/:id" element={<DetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
