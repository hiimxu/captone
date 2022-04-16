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
                class="card"
                style={{
                  height:"40rem",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <div class="card-image">
                  <figure class="image is-5by4">
                    <img
                      src={salon.image ? salon.image : imageUnavailable}
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="card-content" style={{height:"14rem"}}>
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img
                          className="is-rounded"
                          src={salon.image ? salon.image : imageUnavailable}
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div class="media-content" style={{ marginBottom: 0 }}>
                      <p class="title is-4">{salon.nameSalon}</p>
                      <p class="subtitle is-6">
                        <i class="fa-solid fa-location-dot"></i>{" "}
                        {salon.detailAddress}
                      </p>
                    </div>
                  </div>
                  <div class="content">
                    <i class="fa-solid fa-phone"></i>{" "}
                    <span className="is-underlined is-size-4"> {salon.phone}</span>
                    <br />
                    <i class="fa-solid fa-calendar-check"></i>{" "}
                    <span className="has-text-danger-dark has-text-weight-bold">
                      Mon - Fri <br></br> {" "}
                      {salon.timeOpen} - {salon.timeClose}
                      <br />
                    </span>
                  </div>
                </div>
                <footer class="card-footer pr-0 pl-0">
                  <Link
                    to={`/services/${salon.salonId}`}
                    class="card-footer-item has-text-weight-bold has-text-link"
                    onClick={() =>
                      dispatch(updateSelectedSalonId(salon.salonId))
                    }
                  >
                    <p>
                     <span className="is-size-5"> Visit {" "} <i class="fa-solid fa-right-to-bracket"></i>{" "}</span>
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
