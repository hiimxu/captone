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
export default function DetailSalonActive() {
  const navigate = useNavigate();
  const { salonActivated } = useSelector((state) => state.salonBusinessInfo);
  useEffect(() => {
    if (!salonActivated) {
      navigate("/");
      return;
    }
  }, [salonActivated]);
  return salonActivated ? (
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
                  src={salonActivated.image}
                  alt="..."
                />
              </div>
              <div className="column is-6 pt-5">
                <div className="pb-2 mb-3">
                  <h2
                    style={{ color: "#134068" }}
                    className="is-size-1 has-text-weight-semibold"
                  >
                    {salonActivated.nameSalon}
                  </h2>
                  <p className="is-size-5 font-weight-bold">
                    Open:{" "}
                    <span className="text-danger">
                      Mon-Sun {salonActivated.timeOpen.slice(0, -3)} -{" "}
                      {salonActivated.timeClose.slice(0, -3)}
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
                      {salonActivated.phone}
                    </span>
                  </p>
                  <p>
                    <i className="fa-solid fa-location-dot text-secondary"></i>{" "}
                    <span
                      className="is-size-5 font-weight-bold"
                      style={{ color: "#134068" }}
                    >
                      {salonActivated.detailAddress}
                    </span>
                  </p>
                  <p>{salonActivated.description}</p>
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
                  <p className="is-size-4">{salonActivated.salonId}</p>
                  <p className="is-size-4"> {salonActivated.nameOwner}</p>
                  <p className="is-size-4 has-text-primary has-text-weight-bold">
                    {salonActivated.taxCode}
                  </p>
                  <p className="is-size-4">{salonActivated.phone}</p>
                  <p className="is-size-4 has-text-danger">
                    {salonActivated.timeOpen}
                  </p>
                  <p className="is-size-4 has-text-danger">
                    {salonActivated.timeClose}
                  </p>
                  <p className="is-size-4">{salonActivated.district}</p>
                  <p className="is-size-4">{salonActivated.city}</p>
                  <p className="is-size-4 is-underlined">
                    {salonActivated.email}
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
                Deactive
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
