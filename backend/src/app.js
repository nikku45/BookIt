import express from "express";
import cors from "cors";
import experienceRoutes from "./routes/experienceRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/experiences", experienceRoutes);
app.use("/api/bookings", bookingRoutes);



app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use(errorHandler);


export default app;
