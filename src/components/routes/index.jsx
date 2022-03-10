import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "../HomePage";
import Favorite from "../Favorite";
import Location from "../Location";
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
import { AccountRoles } from "../../constants";

const SwitchRoutes = () => {
  const { account } = useSelector((state) => state.loginAccount);

  if (account) {
    if (account.accountData.role === AccountRoles.Customer) {
      return (
        <>
          <Navigation />
          <Header />
          <div className="component">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/location" element={<Location />} />
              <Route path="/favorite" element={<Favorite />} />
              <Route path="/about" element={<About />} />
              <Route path="/history" element={<History />} />
              <Route path="/services" element={<Service />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </>
      );
    } else {
      <>
        <div className="component">
          <Routes>
            <Route path="/" element={<SalonDashboard />} />
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
            <Route path="/salonDashboard" element={<SalonDashboard/>}/>
            <Route path="/add_service" element={<AddService/>}/>

            <Route path="/" element={<HomePage />} />
            <Route path="/location" element={<Location />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/about" element={<About />} />
            <Route path="/history" element={<History />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register_salon" element={<RegisterSalon />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<Service />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </>
    );
  }
};

export default SwitchRoutes;
