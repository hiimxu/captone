import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getSalonList,
  resetSalonList,
  updateSelectedSalonId,
} from "../redux/actions/creators/booking";
import imageUnavailable from "../assets/image-unavailable.png";
import bgImg from "../assets/barbershopbg.jpg";

export default function HomePage() {
  const dispatch = useDispatch();
  const { salonList } = useSelector((state) => state.salon);
  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
  };
  useEffect(() => {
    dispatch(getSalonList());

    return () => {
      dispatch(resetSalonList());
    };
  }, [dispatch]);

  return (
    <div style={root}>
      <div className="columns">
        <div className="column is-2"></div>
        <div className="column is-8">
          <div className="card-columns">
            {salonList?.map((salon) => (
              <div
                className="card"
                style={{
                  height:"46rem",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
                key={salon.salonId}
              >
                <div className="card-image">
                  <figure className="image is-5by4">
                    <img
                      src={salon.image ? salon.image : imageUnavailable}
                      alt=""
                    />
                  </figure>
                </div>
                <div className="card-content" style={{height:"21rem"}}>
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-48x48">
                        <img
                          className="is-rounded"
                          src={salon.image ? salon.image : imageUnavailable}
                          alt=""
                        />
                      </figure>
                    </div>
                    <div className="media-content" style={{ marginBottom: 0,height:"5rem" }}>
                      <p className="title is-4">{salon.nameSalon}</p>
                      <p className="subtitle is-6">
                        <i className="fa-solid fa-location-dot"></i>{" "}
                        {salon.detailAddress}
                      </p>
                     
                    </div>
                    
                  </div>
                  <hr style={{margin:"5px"}}></hr>
                      <i className="fa-solid fa-phone"></i>{" "}
                    <span className="is-underlined is-size-5"> {salon.phone}</span>
                    <br />
                    <i className="fa-solid fa-calendar-check"></i>{" "}
                    <span className="has-text-danger-dark has-text-weight-bold">
                      Mon - Fri  {" "}
                      {salon.timeOpen} - {salon.timeClose}
                      <br />
                    </span>
                    <hr style={{margin:"5px"}}></hr>
                  <div className="content" style={{overflowY: "scroll", height:"8rem"}}>
                    
                   
                    <p>{salon.description}</p>
                  </div>
                </div>
                <footer className="card-footer pr-0 pl-0">
                  <Link
                    to={`/services/${salon.salonId}`}
                    className="card-footer-item has-text-weight-bold has-text-link"
                    onClick={() =>
                      dispatch(updateSelectedSalonId(salon.salonId))
                    }
                  >
                    <p>
                     <span className="is-size-5"> Visit {" "} <i className="fa-solid fa-right-to-bracket"></i>{" "}</span>
                    </p>
                  </Link>
                </footer>
              </div>
            ))}
          </div>
        </div>{" "}
      </div>
      <div className="column is-2"></div>
    </div>
  );
}
