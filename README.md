# 🎟️ BookIt – Experience Booking Web Application

**BookIt** is a full-stack experience booking application where users can browse experiences, view details, select dates and slots, apply promo codes, and confirm their bookings.  
It provides a seamless end-to-end booking experience with integrated pricing logic, promo validation, and reference ID generation.

---

## 🌍 Live Links

- **Frontend:** [https://BootIt.com ](https://book-it-now-nu.vercel.app/) 
- **Backend API:** [https://BookIt-backend.com  ](https://bookit-zm8b.onrender.com)

---

## 🧠 Project Overview

### 👣 User Journey:

1. **Home Page:** User views all available experiences (fetched from `/api/experiences`).  
2. **Experience Details:** On selecting an experience, detailed information (images, description, slots, price) is shown using `/api/experiences/:id`.  
3. **Slot Selection:** User picks a date and available time slot.  
4. **Checkout Page:** Displays booking summary, allows user to enter **name, email**, and optionally **apply promo code**.  
5. **Promo Validation:** The promo code is validated via `/api/promo/validate` and adjusts the total price dynamically.  
6. **Booking Confirmation:** After confirming, `/api/bookings` creates the booking, generates a **unique reference ID**, prevents double-booking for the same slot, and returns a success response.  
7. **Success Screen:** Displays booking details and confirmation message.

---

## ⚙️ Tech Stack

### 🖥️ Frontend
- React + Vite  
- Axios for API calls  
- Tailwind CSS for styling  
- React Router DOM  
- dotenv for environment variables  

### ⚙️ Backend
- Node.js + Express.js  
- MongoDB with Mongoose ORM  
- dotenv for configuration  
- CORS enabled  
- Validation using express-validator / manual checks  

### ☁️ Deployment
- **Frontend:** Render (Static Site)  
- **Backend:** Render (Web Service)  
- **Database:** MongoDB Atlas  

---

## 📂 Folder Structure

BookIt/
│
├── client/ # Frontend (Vite + React)
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── utils/
│ │ └── App.jsx
│ ├── public/
│ ├── .env
│ └── package.json
│
├── server/ # Backend (Node.js + Express)
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── server.js
│ ├── .env
│ └── package.json
│
└── README.md

yaml
Copy code

---

## 🧩 Backend Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/experiences` | Fetch all available experiences |
| `GET` | `/api/experiences/:id` | Fetch a single experience by ID |
| `POST` | `/api/bookings` | Create a new booking |
| `POST` | `/api/promo/validate` | Validate and apply promo code |
| `GET` | `/api/bookings/:refId` | Fetch booking details by reference ID |

---

## 🧠 How It Works

### 📘 Models
- **Experience Model:** Stores experience name, description, images, available slots, and pricing.  
- **Booking Model:** Stores user details, experience ID, selected slot/date, promo code, and generated reference ID.

### ⚙️ Logic Flow
1. **User selects slot and date** → validated in backend.  
2. **Promo code applied** → validated against discount rules.  
3. **Booking created** → generates unique `refId` (via `generateRefId.js`).  
4. **Double-booking prevention** → checks if the selected slot is already taken.  
5. **Response returned** → includes confirmation and booking summary.

---

## ⚡ Environment Variables

### In `/server/.env`
PORT=5000
MONGO_URI=your-mongodb-uri

shell
Copy code

### In `/client/.env`
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api

yaml
Copy code

---

## 🧰 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/bookit.git
cd bookit
2️⃣ Install Backend Dependencies
bash
Copy code
cd server
npm install
npm run dev
3️⃣ Install Frontend Dependencies
bash
Copy code
cd ../client
npm install
npm run dev
Frontend runs on http://localhost:5173
Backend runs on http://localhost:5000

```
💡 Challenges Faced
Managing real-time slot availability and preventing duplicate bookings

Syncing promo validation logic between frontend and backend

Handling CORS issues during local and production testing

Proper environment variable handling with Vite and Render

🎯 What I Learned
Structuring a full-stack project with both frontend and backend in one repo

Implementing booking flow logic end-to-end

Managing environment variables securely across environments

Deploying complex MERN apps seamlessly on Render

👨‍💻 Author
Nitin Rajput


⭐ If you found this project helpful, don’t forget to star the repository!


