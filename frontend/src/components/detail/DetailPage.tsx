import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExperienceById } from "../../api/experiences";
import type { Experience } from "../../types";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const data = await getExperienceById(id!);
        console.log("Fetched experience:", data);
        setExperience(data);
      } catch (error) {
        console.error("Error fetching experience:", error);
      }
    };
    fetchExperience();
  }, [id]);

  if (!experience) {
    return <div className="text-center mt-20 text-gray-600">Loading...</div>;
  }

  const handleGoToCheckout = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and a time slot before proceeding to checkout.");
      return;
    }

    // pass the minimal data needed to checkout
    navigate("/checkout", {
      state: {
        experience,
        selectedDate,
        selectedTime,
        slot: selectedSlot,
      },
    });
  };

  const selectedSlot = experience.slots.find(
    (s) => s.date === selectedDate
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <img
        src={experience.image}
        alt={experience.title}
        className="w-full h-64 object-cover rounded-2xl"
      />
      <h1 className="text-3xl font-bold mt-6">{experience.title}</h1>
      <p className="mt-2 text-gray-700">{experience.description}</p>

      <h2 className="mt-6 text-lg font-semibold">Available Dates</h2>
      <div className="flex flex-wrap gap-3 mt-3">
       {experience.slots.map((d) => (
  <button
    
    key={d.date}
    className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
      selectedDate === d.date
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-gray-100 hover:bg-gray-200 border-gray-300"
    } ${d.availableSlots === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
    onClick={() => d.availableSlots > 0 && setSelectedDate(d.date)}
    disabled={d.availableSlots === 0}
  >
    {d.date} ({d.availableSlots} slots)
  </button>
))}


      </div>
      {selectedSlot && (
  <div className="mt-4">
    <h3 className="text-lg font-semibold mb-2">Select Time</h3>
    <button
      className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
        selectedTime === selectedSlot.time
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-gray-100 hover:bg-gray-200 border-gray-300"
      } ${selectedSlot.availableSlots === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={() =>
        selectedSlot.availableSlots > 0 && setSelectedTime(selectedSlot.time)
      }
      disabled={selectedSlot.availableSlots === 0}
    >
      {selectedSlot.time} ({selectedSlot.availableSlots} slots)
    </button>
  </div>
)}


      <button
        onClick={handleGoToCheckout}
        className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
      >
        Checkout
      </button>
    </div>
  );
};

export default DetailPage;
