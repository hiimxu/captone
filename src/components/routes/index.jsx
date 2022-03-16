import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "../HomePage";
import Favorite from "../Favorite";
import Profile from "../Profile";
import Register from "../Register";
import Login from "../Login";
import Service from "../Service";
import About from "../About";
import History from "../History";
import Navigation from "../Navigation";
import Header from "../Header";
import Footer from "../Footer";
import RegisterSalon from "../salonOwners/RegisterSalon";
import SalonDashboard from "../salonOwners/SalonDashboard";
import AddService from "../salonOwners/AddService";
import Staff from "../Staff";
import { AccountRoles } from "../../constants";

const SwitchRoutes = () => {
  const { account } = useSelector((state) => state.loginAccount);

  if (account) {
    if (account.role === AccountRoles.Customer) {
      return (
        <>
          <Navigation />
          <Header />
          <div className="component">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/favorite" element={<Favorite />} />
              <Route path="/about" element={<About />} />
              <Route path="/history" element={<History />} />
              <Route path="/services/:salonId" element={<Service />} />
              <Route path="/staff/:serviceId" element={<Staff />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </>
      );
    } else {
      <>
        <Route path="/" element={<SalonDashboard />} />
        <div className="component">
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </>;
    }
  } else {
    return (
      <>
        <Navigation />
        <Header />
        <div className="component">
          <Routes>
            {/* test */}
            <Route path="/salonDashboard" element={<SalonDashboard />} />
            <Route path="/add_service" element={<AddService />} />

            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register_salon" element={<RegisterSalon />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </>
    );
  }
};

export default SwitchRoutes;
