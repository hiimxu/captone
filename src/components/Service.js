import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getServiceList,
  resetServiceList,
  updateSelectedServiceId,
} from "../redux/actions/creators/booking";

import imageUnavailable from "../assets/image-unavailable.png";

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
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
  };

  return (
    <div style={root}>
      <div className="p-5 container">
        <div className="row">
          {serviceList?.map((service) => (
            <div
              className="card mb-3"
              style={{ width: "80rem", backgroundColor: "#FBE8CA" }}
            >
              <div className="row g-0">
                <div className="col-md-5 border-0">
                  <img
                    src={service.image ? service.image : imageUnavailable}
                    className="img-thumbnail rounded-start border-0"
                    alt="..."
                    style={{ maxHeight: "15rem" }}
                  />
                </div>
                <div className="col-md-5">
                  <div className="card-body">
                    <h4 className="card-title text-info">{service.name}</h4>
                    <p className="card-text text-danger font-weight-bold">
                      <span className="text-dark font-weight-normal">
                        {service.service_time} minutes .{" "}
                      </span>
                      {service.price}VND
                    </p>
                    <p className="card-text">{service.description}</p>
                  </div>
                </div>
                <div className="col-md-2 mt-5">
                  <Link
                    to={`/staff/${service.salonId}`}
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
