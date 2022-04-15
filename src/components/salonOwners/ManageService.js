import React from "react";
import serviceLists from "../../components/mockUp/serviceData.json";
import fakeReviews from "../../components/mockUp/review.json";
import paperbg from "../../assets/paperbg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";

import { currencyFormatter } from "../../utils";
import imageUnavailable from "../../assets/image-unavailable.png";
import { Link } from "react-router-dom";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";

export default function ManageService() {
  const fakeServiceList = serviceLists;
  const fakeReview = fakeReviews;
  const link = {
    fontSize: "20px",
    color: "white",
  };
  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
    marginTop: "106px",
  };
  const menuStyle = {
    height: "100%",
    backgroundColor: "rgb(0, 82, 189, 95%)",
    width: "3%",
    position: "fixed",
    top: 0,
    left: 0,
    overflowX: "hidden",
    marginTop: "106px",
  }; // -- SIDE MENU HOVER --
  const changeMouseOver = (e) => {
    e.target.style.color = "rgb(0, 82, 189)";
  };
  const changeMouseOut = (e) => {
    e.target.style.color = "white";
  };
  // -- TABS --
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {" "}
      <div style={menuStyle}>
        <aside className="menu">
          <ul className="menu-list">
            <li>
              <Link
                onMouseOver={changeMouseOver}
                onMouseOut={changeMouseOut}
                to="/"
                style={{
                  fontSize: "20px",
                  paddingLeft: "20px",
                  color: "white",
                }}
              >
                <i className="fa-solid fa-clipboard-list"></i>
              </Link>
            </li>
            <div
              className="is-divider"
              style={{ width: "80%", color: "grey", margin: "auto" }}
            ></div>
            <li>
              <Link
                onMouseOver={changeMouseOver}
                onMouseOut={changeMouseOut}
                to="/manage_service"
                style={link}
              >
                <i className="fa-solid fa-shop"></i>
              </Link>
            </li>
            <div
              className="is-divider"
              style={{ width: "80%", color: "grey", margin: "auto" }}
            ></div>
            <li>
              <Link
                onMouseOver={changeMouseOver}
                onMouseOut={changeMouseOut}
                to="/SalonStaff"
                style={link}
              >
                <i className="fa-solid fa-users"></i>
              </Link>
            </li>
            <div
              className="is-divider"
              style={{ width: "80%", color: "grey", margin: "auto" }}
            ></div>
            <li>
              <Link
                onMouseOver={changeMouseOver}
                onMouseOut={changeMouseOut}
                to="/SalonBusinessInfo"
                style={{
                  fontSize: "20px",
                  paddingLeft: "18px",
                  color: "white",
                }}
              >
                <i className="fa-solid fa-gear"></i>
              </Link>
            </li>{" "}
            <div
              className="is-divider"
              style={{ width: "80%", color: "grey", margin: "auto" }}
            ></div>
          </ul>
        </aside>
      </div>{" "}
      <div style={root}>
        <div className="columns">
          <div className="column is-3"></div>
          <div className="column is-6 mt-5">
            <div
              className="p-0 container"
              style={{ backgroundColor: "#FBE8CA" }}
            >
              <div>
                {fakeServiceList?.dataSalon?.map((salon) => (
                  <div
                    className=""
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

              <div className="p-3" style={{ backgroundColor: "#FFDCA6" }}>
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
                                  service.image
                                    ? service.image
                                    : imageUnavailable
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
                                // onClick={() =>
                                //   dispatch(updateSelectedService(service))
                                // }
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
    </div>
  );
}
