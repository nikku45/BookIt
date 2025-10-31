import { Link } from "react-router-dom";
import type { Experience } from "../../types";

interface Props {
  experience: Experience;
}

const ExperienceCard: React.FC<Props> = ({ experience }) => {
  return (
    <Link to={`/experiences/${experience._id}`}>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
        <img
          src={experience.image}
          alt={experience.title}
          className="h-48 w-full object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{experience.title}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{experience.description}</p>
          <p className="mt-3 text-blue-600 font-medium">₹{experience.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ExperienceCard;
