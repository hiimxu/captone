import React from "react";
import {Link} from 'react-router-dom'

export default function SalonDashboard() {

const root ={
  height: "100%",
  width: "13%",
  position: "fixed",  
  top: 0,
  left: 0,  
  overflowX: "hidden",
  paddingTop: "4rem"
}
const link ={
  padding:"6px 8px 6px 16px",
  textDecoration:"none",
  fontSize:"1.25rem",
  display:"block"
}

  return (
    <div style={root} className="salon-dashboard navbar-dark bg-dark">
      <Link to="/" style={link}>Booking</Link>
      <Link to="/" style={link}>Service</Link>
      <Link to="/" style={link}>Staff</Link>
    </div>
  );
}
