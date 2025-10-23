import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { AuthContext } from "../provider/AuthProvider";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const alertShownRef = useRef(false);

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user && !alertShownRef.current) {
        toast.error("You need to login first to access your profile.");
        alertShownRef.current = true;
        navigate("/login");
      } else if (user) {
        setName(user.displayName || "");
        setPhoto(user.photoURL || "");
      }
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  const handleUpdate = async () => {
    try {
      await updateUserProfile({ displayName: name, photoURL: photo });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <Loading />;
  if (!user) return null;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 border border-gray-200 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-[#FF8F8F]">My Profile</h2>

        {photo ? (
          <img
            src={photo}
            alt={name}
            className="w-24 h-24 rounded-full mb-4 mx-auto object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full mb-4 mx-auto flex items-center justify-center bg-gray-200 text-gray-400 text-4xl">
            <FaUser />
          </div>
        )}

        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 w-full p-2 rounded mb-2"
        />

        <label>Photo URL</label>
        <input
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="border border-gray-300 w-full p-2 rounded mb-2"
        />

        <label>Email</label>
        <input
          type="email"
          value={user?.email}
          disabled
          className="border border-gray-300 w-full p-2 rounded mb-4 bg-gray-100"
        />

        <button
          onClick={handleUpdate}
          className="bg-[#FF8F8F] text-white w-full py-2 rounded hover:bg-pink-600 transition-colors duration-300"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
