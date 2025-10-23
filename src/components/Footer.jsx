import {
  FaFacebook,
  FaGithub,
  FaPaw,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#F8F8F8] text-gray-700 rounded-t-3xl shadow-inner mt-20">
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Footer logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-[#FF8F8F]"
        >
          <FaPaw /> WarmPaws
        </Link>

        {/* Social Links */}
        <div className="flex gap-6 text-2xl">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF8F8F] hover:text-[#FF6B6B] transition duration-300"
          >
            <FaTwitter />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF8F8F] hover:text-[#FF6B6B] transition duration-300"
          >
            <FaYoutube />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF8F8F] hover:text-[#FF6B6B] transition duration-300"
          >
            <FaFacebook />
          </a>
          <a
            href="https://github.com/MFRRayhan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF8F8F] hover:text-[#FF6B6B] transition duration-300"
          >
            <FaGithub />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-600 text-sm text-center md:text-left">
          © {new Date().getFullYear()} All rights reserved by{" "}
          <a
            href="https://github.com/MFRRayhan"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#FF8F8F] hover:text-[#FF6B6B] transition duration-300"
          >
            MFR Rayhan
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
