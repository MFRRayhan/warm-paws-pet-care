import { useEffect, useState } from "react";
import ExpertsSection from "../components/ExpertsSection";
import HeroSlider from "../components/HeroSlider";
import Loading from "../components/Loading";
import PopularServices from "../components/PopularServices";
import TipsSection from "../components/TipsSection";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <HeroSlider />
      <PopularServices />
      <TipsSection />
      <ExpertsSection />
    </div>
  );
};

export default Home;
