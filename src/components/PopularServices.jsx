import { useContext } from "react";
import { FaStethoscope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import servicesData from "../data/services.json";
import { AuthContext } from "../provider/AuthProvider";

const PopularServices = () => {
  const popularServices = servicesData
    .filter((service) => service.rating >= 4.5)
    .slice(0, 6);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleServiceClick = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/service/${id}`);
    }
  };

  const handleAllServicesClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/services");
    }
  };

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
          <div
            key={service.serviceId}
            className="border border-gray-200 rounded shadow hover:shadow-lg hover:translate-y-[-5px] transition p-4 flex flex-col gap-2"
          >
            <img
              src={service.image}
              alt={service.serviceName}
              className="h-80 w-full object-cover rounded"
            />
            <div className="flex items-center gap-5">
              <FaStethoscope className="w-10 h-10 text-[#ff8f8f]" />
              <div className="text-left">
                <h3 className="font-bold text-lg mt-2 text-[#333]">
                  {service.serviceName}
                </h3>
                <p className="text-gray-500">{service.description}</p>
              </div>
            </div>

            <button
              onClick={() => handleServiceClick(service.serviceId)}
              className="btn btn-error btn-outline hover:text-white w-40 mt-5"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleAllServicesClick}
        className="inline-block bg-[#FF8F8F] hover:bg-[#ff6b6b] text-white font-semibold px-8 py-3 rounded-full transition"
      >
        View All Services
      </button>
    </section>
  );
};

export default PopularServices;
