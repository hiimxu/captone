import React, { useEffect, useState } from "react";
import { api } from "../api/api.js";
import { Link } from "react-router-dom";

import bgImg from "../assets/barbershopbg.jpg";

export default function Service() {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    fetch(`${api}api/customer/get/serviceOfSalon/1`)
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
        //console.log(posts);
      });
  }, []);
  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <div style={root}>
      <div className="p-5 container">
        <div className="row">
          {posts.data?.map((service) => (
            <div className="col-sm-6 mb-4">
              <div className="card">
                <div className="card-body" key={service.serviceId}>
                  <h5 className="card-title">Service: {service.name}</h5>
                  <p className="card-text">{service.description}</p>
                  <p className="card-text">{service.service_time} minutes</p>
                  <p className="card-text">Price: {service.price} đồng</p>
                  <Link to="/staff" className="btn btn-primary">
                    Book now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
