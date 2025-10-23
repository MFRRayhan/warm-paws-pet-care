import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ServiceCard from "../components/ServiceCard";
import servicesData from "../data/services.json";
import { AuthContext } from "../provider/AuthProvider";

const ServicesPage = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const alertShown = useRef(false);

  // local page loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // ✅ auth check with guaranteed toast render
  useEffect(() => {
    if (!authLoading && !alertShown.current) {
      if (!user) {
        alertShown.current = true;

        // Wait one tick so Toast container mounts
        setTimeout(() => {
          toast.error("Please log in to access our services.", {
            duration: 2000,
            position: "top-center",
          });
        }, 100);

        // Navigate slightly later to allow toast display
        const navTimer = setTimeout(() => {
          navigate("/login", { state: { from: location } });
        }, 2100);

        return () => clearTimeout(navTimer);
      } else {
        setServices(servicesData);
      }
    }
  }, [user, authLoading, navigate, location]);

  if (loading || authLoading) return <Loading />;

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 mt-24 mb-16">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard key={service.serviceId} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
