import {
  FaBed,
  FaHome,
  FaPaw,
  FaSnowflake,
  FaStethoscope,
  FaTint,
} from "react-icons/fa";

const tips = [
  {
    id: 1,
    title: "Keep Pets Indoors",
    description:
      "Protect your pets from harsh cold by keeping them indoors during extreme weather.",
    icon: <FaHome className="text-[#FF8F8F] text-3xl" />,
    image: "https://i.ibb.co.com/9kX48CPk/image.png",
  },
  {
    id: 2,
    title: "Provide Warm Bedding",
    description:
      "Use soft blankets and cozy beds to keep your pets warm and comfortable.",
    icon: <FaBed className="text-[#FF8F8F] text-3xl" />,
    image: "https://i.ibb.co.com/DHJTQT56/image.png",
  },
  {
    id: 3,
    title: "Limit Outdoor Exposure",
    description:
      "Avoid letting pets stay out too long in snow or icy weather to prevent frostbite.",
    icon: <FaSnowflake className="text-[#FF8F8F] text-3xl" />,
    image: "https://i.ibb.co.com/k2Np5Pcg/image.png",
  },
  {
    id: 4,
    title: "Care for Their Paws",
    description:
      "Check your pet’s paws regularly for cracks or dryness caused by winter conditions.",
    icon: <FaPaw className="text-[#FF8F8F] text-3xl" />,
    image: "https://i.ibb.co.com/WvbwBtts/image.png",
  },
  {
    id: 5,
    title: "Keep Fresh Water",
    description:
      "Ensure your pets always have access to clean, unfrozen water to stay hydrated.",
    icon: <FaTint className="text-[#FF8F8F] text-3xl" />,
    image: "https://i.ibb.co.com/sDZ8Cjz/image.png",
  },
  {
    id: 6,
    title: "Regular Vet Checkups",
    description:
      "Schedule regular vet visits to ensure your pets are healthy and protected from winter illnesses.",
    icon: <FaStethoscope className="text-[#FF8F8F] text-3xl" />,
    image: "https://i.ibb.co.com/Y7GXKvY9/image.png",
  },
];

const TipsSection = () => {
  return (
    <section className="my-16 container mx-auto px-4">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-[#FF8F8F] mb-3">
          Winter Care Tips for Pets
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Keep your furry friends happy, healthy, and safe during the winter
          season with these expert-approved care tips.
        </p>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="bg-white shadow-md rounded overflow-hidden hover:shadow-lg hover:translate-y-[-5px] transition duration-300"
          >
            <img
              src={tip.image}
              alt={tip.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-center">
              <div className="flex justify-center mb-3">{tip.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {tip.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TipsSection;
