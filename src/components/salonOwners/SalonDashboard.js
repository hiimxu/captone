import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/creators/auth";

export default function SalonDashboard() {
  const [type,setType]=useState("Booking")
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout("token"));
  };

  const root = {
    height: "100%",
    width: "10%",
    position: "fixed",
    top: 0,
    left: 0,
    overflowX: "hidden",
    backgroundColor:"#134068"
  };
  const link = {
    padding: "6px 8px 6px 16px",
    textDecoration: "none",
    fontSize: "1.25rem",
    display: "block",
    paddingTop: "1rem",
    fontWeight: "bold",
  };

  return (
    <div style={root} className="salon-dashboard navbar-dark ">
      <Link className="text-white" to="/" style={link}>
        <i className="fa-solid fa-calendar-days"></i> Schedule
      </Link>
      <Link className="text-white" to="/history" style={link}>
        <i className="fa-solid fa-calendar-days"></i> History
      </Link>
      <Link className="text-white" to="/manage_service" style={link}>
        <i className="fa-solid fa-list"></i> Service
      </Link>
      <Link  className="text-white"to="/manage_staff" style={link}>
        <i className="fa-solid fa-user-tie"></i> Staff
      </Link>
      <Link  className="text-white"to="/infomation" style={link}>
        <i className="fa-solid fa-address-card"></i> Infomation
      </Link>
      <Link  className="text-white"style={link} to="/" onClick={handleLogout}>
        <i className="fa-solid fa-right-from-bracket"></i> Logout
      </Link>
    </div>
  );
}
