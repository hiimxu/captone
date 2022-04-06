import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getSalonList,
  resetSalonList,
  updateSelectedSalonId,
} from "../redux/actions/creators/booking";
import imageUnavailable from "../assets/image-unavailable.png";

export default function HomePage() {
  const dispatch = useDispatch();
  const { salonList } = useSelector((state) => state.salon);

  useEffect(() => {
    dispatch(getSalonList());

    return () => {
      dispatch(resetSalonList());
    };
  }, [dispatch]);

  return (
    <div className="p-5">
      <div className="card-columns">
        {salonList?.map((salon) => (
          <div
            className="card m-2 rounded"
            style={{ width: "33rem",height:"40rem" }}
            key={salon.salonId}
          >
            <div className="">
              <img
                className="card-img-top rounded-top mb-2 border-0"
                src={salon.image ? salon.image : imageUnavailable}
                alt="Title"
                style={{
                  width: "100%",
                  height: "25rem",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{salon.nameSalon}</h5>
                <p className="card-text">
                  <span className="font-weight-bold">Phone:</span> {salon.phone}
                </p>
                <p className="card-text">
                  <span className="font-weight-bold">Address:</span>{" "}
                  {salon.detailAddress}
                </p>
                <Link
                  to={`/services/${salon.salonId}`}
                  className="btn btn-primary"
                  onClick={() => dispatch(updateSelectedSalonId(salon.salonId))}
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
