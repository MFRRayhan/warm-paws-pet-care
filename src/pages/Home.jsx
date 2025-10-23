import ExpertsSection from "../components/ExpertsSection";
import HeroSlider from "../components/HeroSlider";
import PopularServices from "../components/PopularServices";
import TipsSection from "../components/TipsSection";

const Home = () => {
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
