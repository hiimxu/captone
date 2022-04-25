import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SalonList from "./SalonList.json";

import paperbg from "../../assets/paperbg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import patterbg from "../../assets/patterbg.svg";
import imageUnavailable from "../../assets/image-unavailable.png";
export default function ManageService() {
  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
  };
  return (
    <div style={root}>
      <div
        className="columns"
       
      >
        <div className="column is-3"></div>
        <div className="column is-6 has-text-centered" style={{
          background: "url(" + paperbg + ")",
          // backgroundColor :"#f5f4eb",
          padding: 0,
          marginTop: "30px",
          marginBottom: "30px",
        }}>
          <Link to="/ManageSalon" className="button is-rounded is-info mr-5">
            Back
          </Link>{" "}
          <button className="button is-rounded is-success mr-5 has-text-white">
            Accept 
          </button>
          <button className="button is-rounded is-danger has-text-white">
            Reject  
          </button>
        </div>

        <div className="column is-3"></div>
      </div>
    </div>
  );
}
