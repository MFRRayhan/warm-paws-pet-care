import { FaStethoscope } from "react-icons/fa";
import { Link } from "react-router-dom";
import servicesData from "../data/services.json";

const PopularServices = () => {
  const popularServices = servicesData
    .filter((service) => service.rating >= 4.5)
    .slice(0, 6);

  return (
    <section className="container mx-auto px-4 mt-20 mb-16 text-center">
      <h2 className="text-4xl font-extrabold text-[#FF8F8F] mb-3 tracking-wide">
        Popular Winter Care Services
      </h2>
      <p className="text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
        Check out our most loved winter care services — trusted by hundreds of
        pet owners for their furry friends.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {popularServices.map((service) => (
          <div className="border border-gray-200 rounded shadow hover:shadow-lg hover:translate-y-[-5px] transition p-4 flex flex-col gap-2">
            <img
              src={service.image}
              alt={service.serviceName}
              className="h-80 w-full object-cover rounded"
            />
            <div className="flex items-center gap-5">
              <FaStethoscope className="w-10 h-10 text-[#ff8f8f]"></FaStethoscope>
              <div className="text-left">
                <h3 className="font-bold text-lg mt-2 text-[#333]">
                  {service.serviceName}
                </h3>
                <p className="text-gray-500">{service.description}</p>
              </div>
            </div>

            <Link
              to={`/service/${service.serviceId}`}
              className="btn btn-error btn-outline hover:text-white w-40 mt-5"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      <Link
        to="/services"
        className="inline-block bg-[#FF8F8F] hover:bg-[#ff6b6b] text-white font-semibold px-8 py-3 rounded-full transition"
      >
        View All Services
      </Link>
    </section>
  );
};

export default PopularServices;
