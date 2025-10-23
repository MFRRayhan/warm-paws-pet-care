import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const {
    signIn,
    signInWithGoogle,
    user,
    loading: authLoading,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!authLoading && user) {
      navigate(from, { replace: true });
    }
  }, [user, authLoading, from, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Google login successful!");
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

  if (authLoading || loading) return <Loading />;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-6 border border-gray-200 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-[#FF8F8F]">Login</h2>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-200 w-full p-2 rounded mb-2 focus:ring-2 focus:ring-[#FF8F8F] outline-none transition"
          required
        />

        <label>Password</label>
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-200 w-full p-2 rounded focus:ring-2 focus:ring-[#FF8F8F] outline-none transition"
            required
          />
          <span
            className="absolute right-2 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <Link
          to="/forget-password"
          state={{ email }}
          className="text-sm text-[#FF8F8F] underline mb-2 inline-block"
        >
          Forget Password?
        </Link>

        <button
          type="submit"
          className="bg-[#FF8F8F] text-white w-full py-2 rounded mt-2 hover:bg-[#FF6F91] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 bg-gray-100 border border-gray-200 w-full py-2 rounded mt-2 hover:bg-[#FF8F8F] hover:text-white transition-colors duration-300"
        >
          <FaGoogle /> Login with Google
        </button>

        <p className="mt-2 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#FF8F8F] underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
