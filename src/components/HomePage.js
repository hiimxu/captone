import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api.js";

export default function HomePage() {
  const [allSalon, setAllSalon] = useState([]);
  

  useEffect(() => {
    fetch(`${api}api/customer/get/AllSalon`)
      .then((res) => res.json())
      .then((allSalon) => {
        setAllSalon(allSalon);
        console.log(allSalon);
      });
  }, []);
 

  return (
    <div className="p-5 ">
      <div className="card-group">
        {allSalon.data?.map((salon) => (
          <div className="card m-2 rounded" style={{ width: "18rem" }}>
            <div className="" key={salon.salonId}>
              <img className="card-img-top rounded-top mb-2 border-0" src={salon.image} alt="Salon image" style={{width:"100%",height:"20rem",objectFit: 'cover', objectPosition:"top"}} />
              <div className="card-body">
              <h5 className="card-title">{salon.nameSalon}</h5>
              <p className="card-text">Phone: {salon.phone}</p>
              <p className="card-text">Address: {salon.detailAddress}</p>
              <Link to="/services" className="btn btn-primary">Book now</Link>
              </div>
            </div>
          </div>
          
        ))}
      </div>
    </div>
  );
}
