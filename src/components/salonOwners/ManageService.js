import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import serviceLists from "../../components/mockUp/serviceData.json";
import fakeReviews from "../../components/mockUp/review.json";
import videobg from "../../assets/videobg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import {
  getListServiceForSalon,
  resetListServiceOfSalon
} from "../../redux/actions/creators/salon";
import { currencyFormatter } from "../../utils";
import imageUnavailable from "../../assets/image-unavailable.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/creators/auth";

import { Modal, Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function ManageService() {
  const link = {
    fontSize: "20px",
    color: "white",
  };
  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
  };
  const menuStyle = {
    height: "100%",
    backgroundColor: "#000d6b",
    width: "9%",
    position: "fixed",
    top: 0,
    left: 0,
    overflowX: "hidden",
    fontWeight:"bold"
  };
  const dispatch = useDispatch();
  // -- FIXED DATA --
  const fakeServiceList = serviceLists;
  const fakeReview = fakeReviews;



  // -- API DATA --
  const [type, setType] = useState("Services");
  console.log(type);
  const { listService } = useSelector((state) => state.listServiceSalon);
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );
  useEffect(() => {
    dispatch(getListServiceForSalon(token));
    return () => {
      dispatch(resetListServiceOfSalon());
    };
  }, [dispatch, token]);



  // -- SIDE MENU HOVER --
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
  // -- LOG OUT --
  const { account } = useSelector((state) => state.loginAccount);
  const handleLogout = () => {
    dispatch(logout("token"));
  };
  // -- MODAL --
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
                <p>
                  {" "}
                  <i className="fa-solid fa-clipboard-list"></i> Orders
                </p>
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
                <p>
                  {" "}
                  <i className="fa-solid fa-shop"></i> Salon
                </p>
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
                <p>
                  {" "}
                  <i className="fa-solid fa-users"></i> Staffs{" "}
                </p>
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
                <p>
                  {" "}
                  <i className="fa-solid fa-gear"></i> Information
                </p>
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
                className="text-white"
                style={{
                  fontSize: "20px",
                  paddingLeft: "18px",
                  color: "white",
                }}
                to="/"
                onClick={handleLogout}
              >
                <p>
                  {" "}
                  <i className="fa-solid fa-right-from-bracket"></i> Log out{" "}
                </p>
              </Link>
            </li>
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
              {/* <div>
                {listService?.map((salon) => (
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
                          Mon-Sun {salon.timeOpen} -{" "}
                          {salon.timeClose}
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
              </div> */}

              <div style={{ background: "url("+videobg +")" }}>
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
                      <div className="has-text-right mb-5">
                        <button
                          className="button is-link is-rounded"
                          onClick={handleOpen}
                        >
                          Add service
                        </button>
                      </div>
                      {listService?.map((service) => (
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
                                <p className="">{service.content}</p>
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
                    {/* Modal */}
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 800,
                          bgcolor: "background.paper",
                          border: "2px solid #000",
                          borderRadius: "25px",
                          boxShadow: 24,
                          p: 4,
                        }}
                      >
                        <div>
                          <form action="" method="post" className="addEmployee">
                            <fieldset>
                              <div
                                className="has-text-right"
                                style={{ marginRight: "100px" }}
                              >
                                <label for="Name">Service's name:</label>
                                <input
                                  id="Name"
                                  className="input w-50 ml-5"
                                  style={{ height: "30px" }}
                                  type="text"
                                  placeholder="Text input"
                                />
                                <br></br>
                                <label className="mt-5" for="Time">
                                  Service's time:
                                </label>
                                <input
                                  id="Time"
                                  className="input mt-5 w-50 ml-5"
                                  style={{ height: "30px" }}
                                  type="text"
                                  placeholder="Text input"
                                />{" "}
                                <br></br>
                                <label className="mt-5" for="Price">
                                  Price:
                                </label>
                                <input
                                  id="Price"
                                  className="input w-50 mt-5 ml-5"
                                  style={{ height: "30px" }}
                                  type="text"
                                  placeholder="Text input"
                                />{" "}
                                <br></br>
                                <label className="mt-5" for="Content">
                                  Content:
                                </label>
                                <input
                                  id="Content"
                                  className="input w-50 mt-5 ml-5"
                                  style={{ height: "30px" }}
                                  type="text"
                                  placeholder="Text input"
                                />{" "}
                                <br></br>
                                <label className="mt-5" for="Description">
                                  Description:
                                </label>
                                <input
                                  id="Description"
                                  className="input w-50 mt-5 ml-5"
                                  style={{ height: "30px" }}
                                  type="text"
                                  placeholder="Text input"
                                />{" "}
                                <br></br>
                                <label className="mt-5" for="picture">
                                  Service's picture:
                                </label>
                                <input
                                  id="picture"
                                  className="mt-5 ml-5"
                                  type="file"
                                  accept="image/*"
                                />
                              </div>{" "}
                              <br></br>
                              <div className="has-text-right">
                                <button
                                  className="button is-rounded is-danger"
                                  onClick={handleClose}
                                >
                                  {" "}
                                  Cancel
                                </button>
                                <input
                                  className="button is-rounded is-info ml-5"
                                  type="submit"
                                  value="Add"
                                ></input>
                              </div>
                            </fieldset>
                          </form>
                        </div>
                      </Box>
                    </Modal>
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
