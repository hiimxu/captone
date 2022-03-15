import React, { useEffect, useState } from "react";
import { api } from "../api/api.js";
import { Link } from "react-router-dom";

export default function Staff() {
    const [staff, setStaff]=useState([])
    useEffect(() => {
        fetch(`${api}api/customer/get/staff/1`)
          .then((res) => res.json())
          .then((staff) => {
            setStaff(staff);
            //console.log(staff);
          });
      }, []);
  return (
    <div className="p-5 ">
      <div className="card-group">
        {staff.data?.map((staff) => (
          <div className="card m-2 rounded text-center" style={{ width: "15rem" }}>
            <div className="" key={staff.staffId}>
              {/* <img className="card-img-top rounded-top mb-2 border-0" src={salon.image} alt="Salon image" style={{width:"100%",height:"20rem",objectFit: 'cover', objectPosition:"top"}} /> */}
              <i className="fa-solid fa-user-tie pt-3 mb-3"style={{width:"100%",height:"15rem",fontSize:"15rem"}}></i>
              <div className="card-body">
              <h5 className="card-title">{staff.name}</h5>
              <p className="card-text">Phone: {staff.phone}</p>              
              <Link to="/" className="btn btn-primary">Book now</Link>
              </div>
            </div>
          </div>
          
        ))}
      </div>
    </div>
  )
}
