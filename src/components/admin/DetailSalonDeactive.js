import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import bgImg from "../../assets/barbershopbg.jpg";
import paperbg from "../../assets/paperbg.jpg";

//CSS
const root = {
  backgroundImage: `url(${bgImg})`,
  backgroundRepeat: "repeat-y",
  backgroundSize: "100%",
};

export default function DetailSalonDeactive() {
  const navigate = useNavigate();

  const { salonDeactivated } = useSelector((state) => state.salonBusinessInfo);

  useEffect(() => {
    if (!salonDeactivated) {
      navigate("/");
      return;
    }
  }, [salonDeactivated]);

  return salonDeactivated ? (
    <div style={root}>
      <div className="columns">
        <div className="column is-2"></div>{" "}
        <div
          className="column is-8 p-0 mt-5 mb-5"
          style={{ backgroundImage: "url(" + paperbg + ")" }}
        >
          <div>
            <div className="columns mt-0 pt-0">
              <div className="column is-6" style={{ paddingTop: "0px" }}>
                <img
                  style={{ height: "100%", width: "auto" }}
                  src={salonDeactivated.image}
                  alt="..."
                />
              </div>
              <div className="column is-6 pt-5">
                <div className="pb-2 mb-3">
                  <h2
                    style={{ color: "#134068" }}
                    className="is-size-1 has-text-weight-semibold"
                  >
                    {salonDeactivated.nameSalon}
                  </h2>
                  <p className="is-size-5 font-weight-bold">
                    Open:{" "}
                    <span className="text-danger">
                      Mon-Sun {salonDeactivated.timeOpen.slice(0, -3)} -{" "}
                      {salonDeactivated.timeClose.slice(0, -3)}
                    </span>
                  </p>
                  <p>
                    <span className="is-size-5 font-weight-bold">
                      Phone number:{" "}
                    </span>
                    <span
                      className="is-size-5 is-underlined"
                      style={{ color: "#134068" }}
                    >
                      {salonDeactivated.phone}
                    </span>
                  </p>
                  <p>
                    <i className="fa-solid fa-location-dot text-secondary"></i>{" "}
                    <span
                      className="is-size-5 font-weight-bold"
                      style={{ color: "#134068" }}
                    >
                      {salonDeactivated.detailAddress}
                    </span>
                  </p>
                  <p>{salonDeactivated.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="has-text-centered">
            <div
              style={{
                background: "url(" + paperbg + ")",
                // backgroundColor :"#f5f4eb",
                padding: 0,
                marginTop: "30px",
                marginBottom: "30px",
              }}
            >
              <h1 className="is-size-1 mt-5 mb-5">
                Salon Business Information
              </h1>
              <div className="columns">
                <div className="column is-6 has-text-right">
                  <p className="is-size-4">Salon Id : </p>
                  <p className="is-size-4">Salon owner : </p>
                  <p className="is-size-4">Tax code : </p>
                  <p className="is-size-4">Phone number : </p>
                  <p className="is-size-4">Time open : </p>
                  <p className="is-size-4">Time close : </p>
                  <p className="is-size-4">District : </p>
                  <p className="is-size-4">City : </p>
                  <p className="is-size-4">Email : </p>
                </div>
                <div className="column is-6 has-text-left">
                  <p className="is-size-4">{salonDeactivated.salonId}</p>
                  <p className="is-size-4"> {salonDeactivated.nameOwner}</p>
                  <p className="is-size-4 has-text-primary has-text-weight-bold">
                    {salonDeactivated.taxCode}
                  </p>
                  <p className="is-size-4">{salonDeactivated.phone}</p>
                  <p className="is-size-4 has-text-danger">
                    {salonDeactivated.timeOpen}
                  </p>
                  <p className="is-size-4 has-text-danger">
                    {salonDeactivated.timeClose}
                  </p>
                  <p className="is-size-4">{salonDeactivated.district}</p>
                  <p className="is-size-4">{salonDeactivated.city}</p>
                  <p className="is-size-4 is-underlined">
                    {salonDeactivated.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="pb-5">
              <Link
                to="/ManageSalon"
                className="button is-info mr-5 is-rounded"
              >
                Back
              </Link>
              <button className="button is-danger has-text-white is-rounded">
                Active
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
