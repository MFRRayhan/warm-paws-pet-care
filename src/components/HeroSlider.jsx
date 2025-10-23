import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    image: "https://i.ibb.co.com/2TL7MYW/banner1.jpg",
    title: "Keep Your Pets Warm This Winter",
    subtitle: "Explore cozy outfits and winter care tips",
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/pjT1Gvrr/bg.jpg",
    title: "Winter Grooming & Paw Care",
    subtitle: "Protect your furry friends from the cold",
  },
  {
    id: 3,
    image:
      "https://i.ibb.co.com/NgPr37K7/cozy-dog-resting-woven-basket-home-interior-with-window-soft-light-161754-54726.jpg",
    title: "Comfortable Beds & Cozy Spaces",
    subtitle: "Warm environments for indoor pets",
  },
  {
    id: 4,
    image: "https://i.ibb.co.com/hRJfStR7/banner1.jpg",
    title: "Healthy Winter Nutrition",
    subtitle: "Keep your pets fit and energized during cold months",
  },
];

const HeroSlider = () => {
  return (
    <Swiper
      className="h-screen hero-swiper"
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      loop
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="relative h-screen flex items-center justify-center hero-slider">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover hero-banner"
            />

            <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

            <div className="absolute text-center p-6 md:p-10 rounded-lg max-w-lg mx-4 z-20 hero-text">
              <h2 className="text-3xl md:text-6xl font-extrabold text-white">
                {slide.title}
              </h2>
              <p className="mt-4 text-xl md:text-2xl font-light text-gray-100">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
