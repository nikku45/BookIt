import express from "express";
import cors from "cors";
import experienceRoutes from "./routes/experienceRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import promoRoutes from "./routes/promoRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
app.use(cors(
    {
        origin: ['http://localhost:5173', 'https://book-it-now-nu.vercel.app'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));

app.use(express.json());

// routes
app.use("/api/experiences", experienceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/promo", promoRoutes);

// health
app.get("/health", (req, res) => res.json({ status: "ok" }));

// error handler 
app.use(errorHandler);

export default app;
