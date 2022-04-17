import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "../HomePage";
import Favorite from "../Favorite";
import Profile from "../Profile";
import Register from "../Register";
import Login from "../Login";
import ForgotPassword from "../ForgotPassword";
import Service from "../Service";
import About from "../About";
import History from "../History";
import Navigation from "../Navigation";
import Header from "../Header";
import Footer from "../Footer";
import Staff from "../Staff";
import { AccountRoles } from "../../constants";
import FinishBooking from "../FinishBooking";

import RegisterSalon from "../salonOwners/RegisterSalon";
import SalonDashboard from "../salonOwners/SalonDashboard";
import SalonDashboardMockup from "../mockUp/SalonDashboardMockup";
import ManageService from "../salonOwners/ManageService";
import AddService from "../salonOwners/oldComponents/AddService";
import ManageBooking from "../salonOwners/ManageBooking";
import SalonHstory from "../salonOwners/oldComponents/SalonHstory";
import Schedule from "../salonOwners/oldComponents/Schedule";
import SalonStaff from "../salonOwners/SalonStaff";
import SalonBusinessInfo from "../salonOwners/SalonBusinessInfo";
import SideMenu from "../salonOwners/SideMenu";

// import HeaderSalon from "../salonOwners/Header";

import HomepageMockup from "../mockUp/Homepage";
import ServiceMockup from "../mockUp/Service";
import FinishBookingMockup from "../mockUp/FinishBooking";
import ProfileMockup from "../mockUp/Profile";
import StaffMockup from "../mockUp/StaffMockup";
import ManageStaff from "../salonOwners/oldComponents/ManageStaff";

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
              <Route path="/finish_booking" element={<FinishBooking />}></Route>
              <Route path="*" element={<Navigate to="/" />} />

              <Route path="/StaffMockup/:serviceId" element={<StaffMockup />} />
            </Routes>
          </div>
          <Footer />
        </>
      );
    }
    if (account.role === AccountRoles.Salon) {
      return (
        <>
          <SideMenu />
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/addService" element={<AddService />} />
            <Route path="/manage_service" element={<ManageService />} />
            <Route path="/" element={<SalonDashboard />} />{" "}
            <Route path="/SalonStaff" element={<SalonStaff />} />
            <Route path="/SalonBusinessInfo" element={<SalonBusinessInfo />} />
            <Route path="/manage_staff" element={<ManageStaff />} />
            <Route path="/Schedule" element={<Schedule />} />
            <Route path="/SalonHstory" element={<SalonHstory />} />
          </Routes>
          {/* </div> */}
          <Footer />
        </>
      );
    }

    if (account.role === AccountRoles.Admin) {
      return <></>;
    }
  } else {
    return (
      <>
        <Navigation />
        <Header />
        <div className="component">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Mockup */}
            <Route path="/HomepageMockup" element={<HomepageMockup />} />
            <Route
              path="/servicesMockup/:salonId"
              element={<ServiceMockup />}
            />
            <Route
              path="/FinishBookingMockup"
              element={<FinishBookingMockup />}
            />
            <Route path="/ProfileMockUp" element={<ProfileMockup />} />{" "}
            <Route
              path="SalonDashboardMockup"
              element={<SalonDashboardMockup />}
            />
            {/* User */}
            <Route path="/about" element={<About />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="forgot_password" element={<ForgotPassword />} />
            <Route path="History" element={<History />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="/services/:salonId" element={<Service />} />
            <Route path="*" element={<Navigate to="/login" />} />
            {/* Salon */}
            <Route path="/manage_staff" element={<ManageStaff />} />

            <Route path="/register_salon" element={<RegisterSalon />} />
            <Route path="SalonDashboard" element={<SalonDashboard />} />{" "}
            <Route path="/SalonStaff" element={<SalonStaff />} />
            <Route path="manage_service" element={<ManageService />} />
            <Route path="ManageBooking" element={<ManageBooking />} />
            <Route path="AddService" element={<AddService />} />
            <Route path="SalonBusinessInfo" element={<SalonBusinessInfo />} />
            {/*  */}
          </Routes>
        </div>
        <Footer />
      </>
    );
  }
};

export default SwitchRoutes;
