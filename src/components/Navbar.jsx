import { useContext, useState } from "react";
import { FaBars, FaPaw, FaTimes, FaUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#F8F8F8] shadow-md z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-[#FF8F8F]"
        >
          <FaPaw /> WarmPaws
        </Link>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-2xl text-[#FF8F8F]"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Links */}
        <div
          className={`py-2 md:py-0 header-menu absolute md:static left-0 top-full bg-white md:bg-transparent w-full md:w-auto md:flex md:items-center md:gap-6 transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <NavLink
            to="/"
            className="block md:inline-block px-6 md:px-3 py-2 text-gray-600 hover:text-[#FF8F8F]"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/services"
            className="block md:inline-block px-6 md:px-3 py-2 text-gray-600 hover:text-[#FF8F8F]"
            onClick={() => setIsOpen(false)}
          >
            Services
          </NavLink>
          <NavLink
            to="/profile"
            className="block md:inline-block px-6 md:px-3 py-2 text-gray-600 hover:text-[#FF8F8F]"
            onClick={() => setIsOpen(false)}
          >
            My Profile
          </NavLink>

          {/* Auth Buttons */}
          {user ? (
            <div className="flex flex-row md:items-center gap-2 md:gap-3 mt-2 md:mt-0 px-6 md:px-0">
              <div className="relative group">
                <Link
                  to="/profile"
                  className="flex items-center justify-center"
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-10 h-10 object-cover rounded-full cursor-pointer border border-[#FF8F8F]"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-400 text-xl cursor-pointer border border-[#FF8F8F]">
                      <FaUser />
                    </div>
                  )}
                </Link>
                <span className="absolute z-10 top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                  {user.displayName || "User"}
                </span>
              </div>

              <button
                onClick={() => {
                  logOut();
                  setIsOpen(false);
                }}
                className="btn btn-outline btn-error hover:text-white px-6 py-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-row md:items-center gap-2 md:gap-3 mt-2 md:mt-0 px-6 md:px-0">
              <Link
                to="/login"
                className="btn btn-outline btn-error hover:text-white px-6 py-2"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-outline btn-success hover:text-white px-6 py-2"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
