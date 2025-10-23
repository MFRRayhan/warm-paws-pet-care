import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import servicesData from "../data/services.json";

const ServicesPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(servicesData);
  }, []);

  return (
    <div className="container mx-auto px-4 mt-24 mb-16">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-[#FF8f8f] mb-3 tracking-wide">
          Our Winter Care Services
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Keep your pets cozy and cared for all winter long. From grooming to
          warm clothing, we make sure your furry friends stay happy, healthy,
          and loved.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard key={service.serviceId} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
