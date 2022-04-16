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
  };

  // -- TABS --
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={root}>
      {/* -- TABS STYLE -- */}
      {/* {serviceList?.dataSalon?.map((salon) => (
        <div className="columns" style={{ height: "800px" }}>
          <div className="column is-1 "></div>
          <div
            className="column is-3 mt-5  mb-5"
            style={{
              height:"700px",
              background:
                "url('https://img.freepik.com/free-photo/gray-wall-textures-background_74190-4389.jpg')",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            {" "}
            <div className="" key={salon.salonId}>
              <div className="mb-3">
                <img src={salon.image} alt="..." />
              </div>
              <div className="pl-3 pb-2 mb-3">
                <h2
                  className="is-size-3 has-text-weight-bold"
                  style={{ color: "#134068" }}
                >
                  {salon.nameSalon}
                </h2>
                <p className="is-size-5 font-weight-bold">
                  <i class="fa-solid fa-calendar-check"></i>{" "}
                  <span className="is-size-5 text-danger">
                    Mon-Sun {salon.timeOpen.slice(0, -3)} -{" "}
                    {salon.timeClose.slice(0, -3)}
                  </span>
                </p>
                <p>
                  <span className="is-size-5 font-weight-bold">
                    {" "}
                    <i class="fa-solid fa-phone"></i>{" "}
                  </span>
                  <span
                    className="is-size-5 text is-underlined"
                    style={{ color: "#134068" }}
                  >
                    {salon.phone}
                  </span>
                </p>
                <p>
                  <i className="fa-solid fa-location-dot"></i>{" "}
                  <span
                    className="font-weight-bold"
                    style={{ color: "#134068" }}
                  >
                    {salon.detailAddress}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div
            className="column is-7  mt-5  mb-5"
            style={{
              overflow: "auto",
              padding: 0,
              height: "700px",
              background: "url(" + videobg + ")",
            }}
          >
            {" "}
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
                  <Tab label="Services" value="1" />
                  <Tab label="Review" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div>
                  {fakeServiceList?.data?.map((service) => (
                    <div
                      className="card mb-3"
                      style={{
                        backgroundColor: "#dfe7ed",
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
                            className="button mr-3 is-info is-rounded"
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
                          width:"95%",
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
          <div className="column is-1"></div>
        </div>
      ))} */}

      {/* -- VERTICAL STYLE -- */}

      <div className="columns">
        <div className="column is-3"></div>
        <div
          className="column is-6 mt-3 p-0"
          style={{
            boxShadow:
              "1px 1px 20px black"
          }}
        >
          <div className="p-0" style={{ backgroundColor: "#FBE8CA" }}>
            <div>
              {serviceList?.dataSalon?.map((salon) => (
                <div
                  className=""
                  style={{ background: "url(" + patterbg + ")" }}
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
                          className="is-size-2 has-text-weight-semibold"
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
                            className="is-size-5 text"
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

            <div className="p-3" style={{ background: "url(" + videobg + ")" }}>
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
                    <Tab label="Services" value="1" />
                    <Tab label="Review" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div>
                    {serviceList?.data?.map((service) => (
                      <div
                        className="card mb-3"
                        style={{
                          backgroundColor: "#dfe7ed",
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
                              className="button mr-3 is-info is-rounded"
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
