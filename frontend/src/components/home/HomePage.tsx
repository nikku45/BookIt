import { useEffect, useState } from "react";
import { getExperiences } from "../../api/experiences";
import type{ Experience } from "../../types";
import ExperienceCard from "./ExperienceCard";

const HomePage = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExperiences();
        setExperiences(data);
      } catch (err) {
        console.error("Error fetching experiences", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-20 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Experiences</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <ExperienceCard key={exp._id} experience={exp} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
