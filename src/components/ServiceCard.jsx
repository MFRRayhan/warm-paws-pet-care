import { FaStethoscope } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  return (
    <div className="border border-gray-200 rounded shadow hover:shadow-lg hover:translate-y-[-5px] transition p-4 flex flex-col gap-2">
      <img
        src={service.image}
        alt={service.serviceName}
        className="h-80 w-full object-cover rounded"
      />
      <div className="flex items-center gap-5">
        <FaStethoscope className="w-10 h-10 text-[#ff8f8f]"></FaStethoscope>
        <div className="">
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
  );
};

export default ServiceCard;
