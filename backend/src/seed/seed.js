import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db.js";
import Experience from "../models/Experience.js";
import Promo from "../models/Promo.js";

const MONGO_URI = process.env.MONGO_URI;

const seed = async () => {
  await connectDB(MONGO_URI);

  await Experience.deleteMany({});
  await Promo.deleteMany({});

  const experiences = [
    {
      title: "Mountain Sunrise Trek",
      description: "Early morning trek with sunrise view.",
      image: "https://www.bagusbalisunrise.com/wp-content/uploads/2019/09/14_Mount-Batur-Sunrise-Trekking-Price.jpg.webp",
      location: "Uttarakhand",
      price: 1200,
      slots: [
        { date: "2025-11-05", time: "06:00", totalSlots: 10, availableSlots: 10 },
        { date: "2025-11-06", time: "06:00", totalSlots: 8, availableSlots: 8 }
      ]
    },
    {
      title: "River Kayaking",
      description: "2-hour kayaking session with guide.",
      image: "https://hikebiketravel.com/wp-content/uploads/2016/08/IMGP1391hs770-1.jpg",
      location: "Riverside",
      price: 800,
      slots: [
        { date: "2025-11-05", time: "09:00", totalSlots: 12, availableSlots: 12 },
        { date: "2025-11-05", time: "14:00", totalSlots: 12, availableSlots: 12 }
      ]
    }
  ];

  const promos = [
    { code: "SAVE10", discountType: "percent", value: 10 },
    { code: "FLAT100", discountType: "flat", value: 100 }
  ];

  await Experience.insertMany(experiences);
  await Promo.insertMany(promos);

  console.log("Seeding done");
  process.exit(0);
};

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
