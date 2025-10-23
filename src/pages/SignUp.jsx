import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { AuthContext } from "../provider/AuthProvider";

const Signup = () => {
  const { createUser, signInWithGoogle, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [hasUpper, setHasUpper] = useState(false);
  const [hasLower, setHasLower] = useState(false);
  const [hasLength, setHasLength] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password validation
  useEffect(() => {
    setHasUpper(/[A-Z]/.test(password));
    setHasLower(/[a-z]/.test(password));
    setHasLength(password.length >= 6);
  }, [password]);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Handle email/password signup
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      return toast.error(
        "You must accept the Terms and Conditions to register!"
      );
    }
    if (!hasUpper || !hasLower || !hasLength) {
      return toast.error("Please meet all password requirements.");
    }
    setLoading(true);
    try {
      await createUser(email, password, name, photo);
      toast.success("Signup successful! Redirecting...");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google signup/login
  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Google login successful! Redirecting...");
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        toast("Google sign-in canceled");
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md p-6 border border-gray-200 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-[#FF8F8F]">Sign Up</h2>

        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-200 w-full p-2 rounded mb-2 focus:ring-2 focus:ring-[#FF8F8F] outline-none transition placeholder-gray-400"
          required
        />

        <label>Photo URL</label>
        <input
          type="text"
          placeholder="Paste your photo URL (optional)"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="border border-gray-200 w-full p-2 rounded mb-2 focus:ring-2 focus:ring-[#FF8F8F] outline-none transition placeholder-gray-400"
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-200 w-full p-2 rounded mb-2 focus:ring-2 focus:ring-[#FF8F8F] outline-none transition placeholder-gray-400"
          required
        />

        <label>Password</label>
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-200 w-full p-2 rounded focus:ring-2 focus:ring-[#FF8F8F] outline-none transition placeholder-gray-400"
            required
          />
          <span
            className="absolute right-2 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <ul className="mb-2 text-sm">
          <li className={hasUpper ? "text-green-500" : "text-red-500"}>
            • At least one uppercase letter
          </li>
          <li className={hasLower ? "text-green-500" : "text-red-500"}>
            • At least one lowercase letter
          </li>
          <li className={hasLength ? "text-green-500" : "text-red-500"}>
            • Minimum 6 characters
          </li>
        </ul>

        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="terms" className="text-sm">
            I accept the{" "}
            <Link to="#" className="text-[#FF8F8F] underline">
              Terms and Conditions
            </Link>
          </label>
        </div>

        <button
          type="submit"
          className="bg-[#FF8F8F] text-white w-full py-2 rounded mt-2
             hover:bg-[#FF6F91] hover:shadow-lg hover:-translate-y-0.5
             transition-all duration-300"
        >
          Register
        </button>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="flex items-center justify-center gap-2 bg-gray-100 border border-gray-200 w-full py-2 rounded mt-2 hover:bg-[#FF8F8F] hover:text-white transition-colors duration-300"
        >
          <FaGoogle /> Sign Up with Google
        </button>

        <p className="mt-2 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[#FF8F8F] underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
