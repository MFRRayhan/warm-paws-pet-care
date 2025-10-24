import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";

const ForgetPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const emailRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    if (!email) {
      toast.error("Please enter your email!");
      return;
    }
    try {
      setLoading(true);
      await resetPassword(email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      console.error("Reset error:", error);
      if (error.code === "auth/user-not-found") toast.error("No user found!");
      else if (error.code === "auth/invalid-email")
        toast.error("Invalid email!");
      else toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
      <form
        onSubmit={handleReset}
        className="w-full max-w-md p-6 border border-gray-200 rounded shadow-md bg-white"
      >
        <h2 className="text-2xl font-bold mb-4 text-[#FF8F8F] text-center">
          Reset Password
        </h2>

        <label className="block mb-1 font-medium text-gray-700">Email</label>
        <input
          ref={emailRef}
          type="email"
          placeholder="Enter your registered email"
          className="border border-gray-200 w-full p-2 rounded mb-3 focus:ring-2 focus:ring-[#FF8F8F] outline-none transition placeholder-gray-400"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white font-medium transition-all duration-300 ${
            loading
              ? "bg-[#FF8F8F]/60 cursor-not-allowed"
              : "bg-[#FF8F8F] hover:bg-[#FF6F91] hover:shadow-lg hover:-translate-y-0.5"
          }`}
        >
          {loading ? "Sending..." : "Reset Password"}
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Remember your password?{" "}
          <a href="/login" className="text-[#FF8F8F] hover:underline">
            Back to Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default ForgetPassword;
