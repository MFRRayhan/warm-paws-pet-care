import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const { signIn, signInWithGoogle, user, authLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      navigate(from, { replace: true });
    }
  }, [user, authLoading, from, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      toast.success("Login successful!");
    } catch (error) {
      if (error.code === "auth/wrong-password")
        toast.error("Password is incorrect!");
      else if (error.code === "auth/user-not-found")
        toast.error("User not found!");
      else if (error.code === "auth/invalid-email")
        toast.error("Invalid email!");
      else toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Google login successful!");
    } catch (error) {
      console.log(error);
    }
  };

  if (authLoading) return <Loading />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-6 border border-gray-200 rounded shadow-md bg-white"
      >
        <h2 className="text-2xl font-bold mb-4 text-[#FF8F8F]">Login</h2>

        <label className="block mb-1 font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-200 w-full p-2 rounded mb-2 focus:ring-2 focus:ring-[#FF8F8F] outline-none transition"
          required
        />

        <label className="block mb-1 font-medium text-gray-700">Password</label>
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
