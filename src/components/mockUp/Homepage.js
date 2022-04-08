import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";
import "bulma-extensions/dist/css/bulma-extensions.min.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getSalonList,
  resetSalonList,
  updateSelectedSalonId,
} from "../../redux/actions/creators/booking";
import imageUnavailable from "../../assets/image-unavailable.png";
import ArraySalon from "./data.json";
import bgImg from "../../assets/barbershopbg.jpg";
const arraySalon = ArraySalon;
export default function HomePage() {
  const dispatch = useDispatch();
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
      <div class="columns">
        <div class="column is-2"></div>

        <div className="column is-8">
          <div className="card-columns">
            {arraySalon?.map((salon) => (
              <div class="card" style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <div class="card-image">
                  <figure class="image is-5by4">
                    <img
                      src={salon.image ? salon.image : imageUnavailable}
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="card-content">
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
                    <span className="is-underlined"> {salon.phone}</span>
                    <br />
                    <i class="fa-solid fa-calendar-check"></i>{" "}
                    <span className="has-text-danger-dark has-text-weight-bold">
                      {salon.openDay}
                      <br />
                    </span>
                    <hr
                      class="solid"
                      style={{
                        marginTop: 5,
                        marginBottom: 10,
                        borderTop: 1 + "px solid grey",
                        opacity: 20 + "%",
                      }}
                    />
                    {salon.detailSalon}
                    <br />
                  </div>
                </div>
                <footer class="card-footer">
                  {/* <a
                    href="#"
                    class="card-footer-item has-text-weight-semibold has-text-danger"
                  >
                    <p>
                      {" "}
                      <i class="fa-solid fa-heart"></i> Favorite
                    </p>
                  </a> */}
                  <Link
                    to={`/servicesMockup/${salon.salonId}`}
                    class="card-footer-item has-text-weight-bold has-text-link"
                    onClick={() =>
                      dispatch(updateSelectedSalonId(salon.salonId))
                    }
                  >
                    <p>
                      Visit <i class="fa-solid fa-right-to-bracket"></i>{" "}
                    </p>
                  </Link>
                </footer>
              </div>
            ))}
          </div>
        </div>
        <div class="column is-2"></div>
      </div>
    </div>
  );
}
