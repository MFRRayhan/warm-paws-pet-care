import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import servicesData from "../data/services.json";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const found = servicesData.find((s) => s.serviceId === parseInt(id));
      setService(found);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  const handleBook = (e) => {
    e.preventDefault();
    toast.success("Service booked successfully!");
    setName("");
    setEmail("");
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 mt-28 mb-20">
      <div className="md:flex md:gap-10 items-stretch">
        <img
          src={service.image}
          alt={service.serviceName}
          className="rounded-2xl shadow-md object-cover w-full md:w-1/2 h-full"
        />
        <div className="mt-6 md:mt-0 md:w-1/2 flex flex-col justify-between h-full">
          <div>
            <span className="inline-block bg-[#FF6B6B] text-white font-semibold px-3 py-1 rounded-full mb-3">
              {service.category}
            </span>
            <h2 className="text-4xl font-extrabold text-[#FF6B6B] mb-3">
              {service.serviceName}
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {service.description}
            </p>
            <p className="text-gray-800 font-semibold">
              Provider:{" "}
              <span className="font-normal text-gray-600">
                {service.providerName}
              </span>
            </p>
            <p className="text-gray-800">
              Email:{" "}
              <span className="font-normal text-gray-600">
                {service.providerEmail}
              </span>
            </p>
            <p className="mt-2 font-bold text-[#FF6B6B] text-lg">
              Price: ${service.price}
            </p>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`${
                    index < Math.round(service.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  } w-5 h-5`}
                />
              ))}
              <span className="text-sm text-gray-500 ml-2">
                ({service.rating.toFixed(1)})
              </span>
            </div>
            <p className="mt-2 text-gray-700">
              Slots Available:{" "}
              <span className="font-semibold text-gray-800">
                {service.slotsAvailable}
              </span>
            </p>
          </div>
          <form
            onSubmit={handleBook}
            className="mt-6 border border-gray-300 p-5 rounded-2xl shadow-sm"
          >
            <h3 className="font-bold text-lg mb-3 text-gray-800">
              Book This Service
            </h3>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 focus:ring-2 focus:ring-[#FF6B6B] outline-none w-full p-2 rounded-lg mb-3 placeholder-gray-400"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 focus:ring-2 focus:ring-[#FF6B6B] outline-none w-full p-2 rounded-lg mb-3 placeholder-gray-400"
              required
            />
            <button
              type="submit"
              className="bg-[#FF6B6B] hover:bg-[#ff5252] transition text-white font-semibold w-full py-2 rounded-lg shadow-md"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
