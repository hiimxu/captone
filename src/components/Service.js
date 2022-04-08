import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getServiceList,
  resetServiceList,
  updateSelectedServiceId,
} from "../redux/actions/creators/booking";
import {  
  currencyFormatter,
} from "../utils";

import bgImg from "../assets/barbershopbg.jpg";
import imageUnavailable from "../assets/image-unavailable.png";

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
      <div
        className="pl-3 pb-3 pr-3 container"
        style={{ backgroundColor: "#FBE8CA" }}
      >
        <div>
          {serviceList?.dataSalon?.map((salon) => (
            <div
              className="rounded-bottom"
              style={{ backgroundColor: "#C3AF91" }}
              key={salon.salonId}
            >
              <div
                style={{
                  height: "15rem",
                }}
                className="mb-3"
              >
                <img
                  style={{ maxHeight: "15rem" }}
                  src={salon.image}
                  alt="..."
                />
              </div>
              <div className="pl-3 pb-2 mb-3">
                <h2 style={{ color: "#134068" }}>{salon.nameSalon}</h2>
                <p className="font-weight-bold">
                  Open:{" "}
                  <span className="text-danger">
                    Mon-Sun {salon.timeOpen.slice(0, -3)} -{" "}
                    {salon.timeClose.slice(0, -3)}
                  </span>
                </p>
                <p>
                  <span className="font-weight-bold">Phone number: </span>
                  <span className="text" style={{ color: "#134068" }}>
                    {salon.phone}
                  </span>
                </p>
                <p>
                  <i className="fa-solid fa-location-dot text-secondary"></i>{" "}
                  <span
                    className="font-weight-bold"
                    style={{ color: "#134068" }}
                  >
                    {salon.detailAddress}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
        {serviceList?.data?.map((service) => (
          <div
            className="card mb-3"
            style={{ backgroundColor: "#E0DAA4", maxHeight: "20rem" }}
            key={service.serviceId}
          >
            <div className="row g-0">
              <div className="col-md-5">
                <img
                  src={service.image ? service.image : imageUnavailable}
                  className="img-fluid rounded-start rounded-left"
                  alt="..."
                  style={{ maxHeight: "20rem" }}
                />
              </div>
              <div className="col-md-5">
                <div className="card-body">
                  <h4 className="card-title text-info">{service.name}</h4>
                  <p
                    className="card-text text-danger font-weight-bold"
                    style={{ fontSize: "1.5rem" }}
                  >
                    <span
                      className="font-weight-normal text-dark"
                      style={{ fontSize: "1.1rem" }}
                    >
                      {service.service_time} minutes .{" "}
                    </span>
                    {currencyFormatter.format(service.price)}
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
  );
}
