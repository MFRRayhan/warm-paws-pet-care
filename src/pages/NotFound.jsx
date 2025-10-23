import { FaPaw } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F8F8F8] text-gray-700 px-4">
      <h1 className="text-8xl font-extrabold text-[#FF8F8F] mb-4">404</h1>
      <FaPaw className="text-[#FF8F8F] text-6xl mb-4 animate-bounce" />
      <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6 text-center">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-[#FF8F8F] hover:bg-[#FF6B6B] text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
