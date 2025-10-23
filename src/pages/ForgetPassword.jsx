import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const ForgetPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const location = useLocation();
  const preEmail = location.state?.email || "";

  const [email, setEmail] = useState(preEmail);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      toast.success("Password reset email sent!");
      window.open("https://mail.google.com/", "_blank");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleReset}
        className="w-full max-w-md p-6 border border-gray-200 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-[#FF8F8F]">
          Reset Password
        </h2>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-200 w-full p-2 rounded mb-2 focus:ring-2 focus:ring-[#FF8F8F] outline-none transition"
          required
        />
        <button
          type="submit"
          className="bg-[#FF8F8F] text-white w-full py-2 rounded mt-2
             hover:bg-[#FF6F91] hover:shadow-lg hover:-translate-y-0.5
             transition-all duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
