import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import ForgetPassword from "./pages/ForgetPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ServiceDetails from "./pages/ServiceDetails";
import ServicesPage from "./pages/ServicesPage";
import Signup from "./pages/Signup";

import { AuthContext } from "./provider/AuthProvider";

const App = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loading />
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/service/:id"
          element={
            <PrivateRoute>
              <ServiceDetails />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
