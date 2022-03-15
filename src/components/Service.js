import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getServiceList,
  resetServiceList,
  updateSelectedServiceId,
} from "../redux/actions/creators/booking";

import bgImg from "../assets/barbershopbg.jpg";

export default function Service() {
  const { salonId } = useParams();

  const dispatch = useDispatch();
  const { serviceList } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(getServiceList(salonId));

    return () => {
      dispatch(resetServiceList());
    };
  }, [dispatch, salonId]);
  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <div style={root}>
      <div className="p-5 container">
        <div className="row">
          {serviceList?.map((service) => (
            <div className="col-sm-6 mb-4" key={service.serviceId}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Service: {service.name}</h5>
                  <p className="card-text">{service.description}</p>
                  <p className="card-text">{service.service_time} minutes</p>
                  <p className="card-text">Price: {service.price} đồng</p>
                  <Link
                    to={`/staff/${service.serviceId}`}
                    className="btn btn-primary"
                    onClick={() =>
                      dispatch(updateSelectedServiceId(service.serviceId))
                    }
                  >
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
