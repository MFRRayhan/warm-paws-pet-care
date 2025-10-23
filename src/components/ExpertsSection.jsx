import { FaStethoscope } from "react-icons/fa";

const experts = [
  {
    id: 1,
    name: "Dr. Nahra Arhan",
    title: "Veterinarian",
    image: "https://i.ibb.co/v4Y9C0xb/team1.jpg",
  },
  {
    id: 2,
    name: "Dr. Sabidul Islam",
    title: "Pet Nutritionist",
    image: "https://i.ibb.co/275fJsqQ/image.png",
  },
  {
    id: 3,
    name: "Dr. Rubaiyat Shahrin",
    title: "Grooming Specialist",
    image: "https://i.ibb.co/fRMm4MJ/team2.jpg",
  },
  {
    id: 4,
    name: "Dr. Rishad Islam",
    title: "Veterinarian",
    image: "https://i.ibb.co/vvcK725r/image.png",
  },
];

const ExpertsSection = () => {
  return (
    <section className="my-16 container mx-auto px-4">
      <h2 className="text-3xl font-extrabold text-center text-[#FF8F8F] mb-10">
        Meet Our Expert Vets
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {experts.map((expert) => (
          <div
            key={expert.id}
            className="border border-gray-300 rounded-2xl p-6 text-center shadow-md hover:shadow-lg hover:translate-y-[-5px] transition duration-300"
          >
            <img
              src={expert.image}
              alt={expert.name}
              className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
              <FaStethoscope className="text-[#FF8F8F]" /> {expert.name}
            </h3>
            <p className="text-[#FF8F8F] mt-1">{expert.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpertsSection;
