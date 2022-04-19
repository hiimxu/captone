import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getServiceList,
  resetServiceList,
  updateSelectedService,
} from "../redux/actions/creators/booking";
import { currencyFormatter } from "../utils";

import bgImg from "../assets/barbershopbg.jpg";
import paperbg from "../assets/paperbg.jpg";
import videobg from "../assets/videobg.jpg";
import patterbg from "../assets/patterbg.svg";
import imageUnavailable from "../assets/image-unavailable.png";
import serviceLists from "../components/mockUp/serviceData.json";
import fakeReviews from "../components/mockUp/review.json";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";

export default function Service() {
  // FAKE DATA
  // const fakeServiceList = serviceLists;
  const fakeReview = fakeReviews;

  // API DATA
  const [type, setType] = useState("Services");
  console.log(type);
  const { serviceList } = useSelector((state) => state.service);
  const { salonId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServiceList(salonId));
    return () => {
      dispatch(resetServiceList());
    };
  }, [dispatch, salonId]);

  // CSS
  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
    minHeight: "40rem",
  };

  // -- TABS --
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={root}>
      {/* -- VERTICAL STYLE -- */}

      <div className="columns">
        <div className="column is-3"></div>
        <div
          className="column is-6 mt-3 p-0"
          style={{
            boxShadow: "1px 1px 20px black",
          }}
        >
          <div
            className="p-0"
            style={{ backgroundImage: "url(" + paperbg + ")" }}
          >
            <div>
              {serviceList?.dataSalon?.map((salon) => (
                <div
                  className=""
                  // style={{ background: "url(" + patterbg + ")" }}
                  key={salon.salonId}
                >
                  <div className="columns mt-0 pt-0">
                    <div className="column is-6" style={{ paddingTop: "0px" }}>
                      <img
                        style={{ height: "100%", width: "auto" }}
                        src={salon.image}
                        alt="..."
                      />
                    </div>
                    <div className="column is-6 pt-5">
                      <div className="pb-2 mb-3">
                        <h2
                          style={{ color: "#134068" }}
                          className="is-size-1 has-text-weight-semibold"
                        >
                          {salon.nameSalon}
                        </h2>
                        <p className="is-size-5 font-weight-bold">
                          Open:{" "}
                          <span className="text-danger">
                            Mon-Sun {salon.timeOpen.slice(0, -3)} -{" "}
                            {salon.timeClose.slice(0, -3)}
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
                            {salon.phone}
                          </span>
                        </p>
                        <p>
                          <i className="fa-solid fa-location-dot text-secondary"></i>{" "}
                          <span
                            className="is-size-5 font-weight-bold"
                            style={{ color: "#134068" }}
                          >
                            {salon.detailAddress}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                backgroundImage: "url(" + paperbg + ")",
                minHeight: "35rem",
              }}
            >
              <TabContext value={value}>
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <TabList
                    variant="fullWidth"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                  >
                    <Tab className="font-weight-bold" label="Services" value="1" />
                    <Tab className="font-weight-bold" label="Review" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1" style={{marginBottom:"1.5rem"}}>
                  <div>
                    {serviceList?.data?.map((service) => (
                      <div
                        className="card mb-3"
                        style={{
                          background: "url(" + paperbg + ")",
                          height: "12rem",
                          borderRadius: "25px",
                        }}
                        key={service.serviceId}
                      >
                        <div className="columns">
                          <div className="column is-4">
                            <img
                              src={
                                service.image ? service.image : imageUnavailable
                              }
                              alt="..."
                              style={{
                                height: "100%",
                                width: "100%  ",
                                maxHeight: "12rem",
                                borderRadius: "25px",
                              }}
                            />
                          </div>
                          <div className="column is-6 mt-2 has-text-left">
                            <div>
                              <h4 className="has-text-info-dark is-size-3 has-text-weight-bold">
                                {service.name}
                              </h4>
                              <p
                                className="has-text-danger"
                                style={{ fontSize: "1.5rem" }}
                              >
                                <span className="has-text-dark">
                                  {service.service_time} minutes -{" "}
                                </span>
                                {currencyFormatter.format(service.price)}
                              </p>
                              <p className="">{service.description}</p>
                            </div>
                          </div>
                          <div className="column is-2 mt-3 has-text-right">
                            <Link
                              to={`/staff/${service.salonId}`}
                              style={{ width: "100px" }}
                              className="button mr-3 is-info is-rounded font-weight-bold"
                              onClick={() =>
                                dispatch(updateSelectedService(service))
                              }
                            >
                              Book
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div>
                    {fakeReview?.map((review) => (
                      <div
                        className="m-4  "
                        style={{
                          backgroundColor: "white",
                          height: "10rem",
                          borderRadius: "25px",
                        }}
                      >
                        <h1 className="ml-3 is-size-4">
                          <span className="is-size-3 mt-5 has-text-weight-semibold">
                            {review.nameCustomer}{" "}
                          </span>
                          - {review.wsend}
                        </h1>
                        <p className="ml-3 is-size-5"> {review.dateCreate}</p>
                        <hr
                          className="solid"
                          style={{
                            width: "95%",
                            marginTop: 5,
                            marginLeft: 10,
                            marginBottom: 0,
                            borderTop: 1 + "px solid grey",
                            opacity: 60 + "%",
                          }}
                        />
                        <p className="ml-3"> {review.conntent}</p>
                      </div>
                    ))}
                  </div>
                </TabPanel>
              </TabContext>
            </div>
          </div>
        </div>
        <div className="column is-3"></div>
      </div>
    </div>
  );
}
