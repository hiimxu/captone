import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import serviceLists from "../../components/mockUp/serviceData.json";
import fakeReviews from "../../components/mockUp/review.json";
import paperbg from "../../assets/paperbg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import patterbg from "../../assets/patterbg.svg";

import {
  getListServiceForSalon,
  resetListServiceOfSalon,
  getProfileOfSalon,
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
  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
  };
  const dispatch = useDispatch();
  // -- FIXED DATA --
  // const fakeServiceList = serviceLists;
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

  // -- GET SALON PROFILE --
  const { profileSalon } = useSelector((state) => state.profileSalon);
  console.log(profileSalon);
  useEffect(() => {
    dispatch(getProfileOfSalon(token));
  }, [dispatch, token]);

  // -- TABS --
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // -- MODAL CSS --
  const modalcss = {
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
  };

  // -- MODAL SERVICE --
  const [openService, setOpenSerive] = useState(false);
  const handleOpenService = () => setOpenSerive(true);
  const handleCloseService = () => setOpenSerive(false);

  // -- MODAL SALON --
  const [openSalon, setOpenSalon] = useState(false);
  const handleOpenSalon = () => setOpenSalon(true);
  const handleCloseSalon = () => setOpenSalon(false);

  return (
    <div>
      {" "}
      <div style={root}>
        <div className="columns">
          <div className="column is-3"></div>
          <div
            className="column is-6 mt-5 p-0"
            style={{ boxShadow: "1px 1px 20px black" }}
          >
            <div
              className="p-0 container"
              style={{ backgroundColor: "#FBE8CA" }}
            >
              <div>
                {profileSalon?.map((salon) => (
                  <div
                    className=""
                    style={{ background: "url(" + patterbg + ")" }}
                    key={salon.salonId}
                  >
                    <div className="columns mt-0 pt-0">
                      <div
                        className="column is-6"
                        style={{ paddingTop: "0px" }}
                      >
                        <img
                          style={{ height: "100%", width: "auto" }}
                          src={salon.image}
                          alt="..."
                        />
                      </div>
                      <div className="column is-6 pt-3">
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
                          <p className="is-size-5">{salon.description}</p>
                        </div>
                        <div className="has-text-right mb-5 mr-5">
                          <button
                            className="button is-link is-rounded"
                            onClick={handleOpenSalon}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Modal Salon */}
              <Modal
                open={openSalon}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalcss}>
                  <div>
                    <form action="" method="post" className="editSalon">
                      <fieldset>
                        <div
                          className="has-text-right"
                          style={{ marginRight: "100px" }}
                        >
                          <br></br>
                          <label className="mt-5" for="TimeOpen">
                            Salon open time:
                          </label>
                          <input
                            id="TimeOpen"
                            className="input mt-5 w-50 ml-5"
                            style={{ height: "30px" }}
                            type="text"
                            placeholder="Text input"
                          />{" "}
                          <br></br>
                          <label className="mt-5" for="TimeClose">
                            Salon close time:
                          </label>
                          <input
                            id="TimeClose"
                            className="input mt-5 w-50 ml-5"
                            style={{ height: "30px" }}
                            type="text"
                            placeholder="Text input"
                          />{" "}
                          <br></br>
                          <label className="mt-5" for="Description">
                            Description:
                          </label>
                          <textarea
                            id="Description"
                            className="input w-50 mt-5 ml-5"
                            style={{ height: "30px" }}
                            placeholder="Text input"
                          />{" "}
                          <br></br>
                          <label className="mt-5" for="picture">
                            Salon's picture:
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
                            onClick={handleCloseSalon}
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
              <div style={{ background: "url(" + paperbg + ")" }}>
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
                          onClick={handleOpenService}
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
                            <button
                                style={{ width: "100px" }}
                                className="button mr-3 is-primary is-rounded"
                              >
                                Book 
                              </button>
                              <button
                                style={{ width: "100px" }}
                                className="button mr-3 is-info is-rounded"
                              >
                                Edit
                              </button>
                              <button
                                style={{ width: "100px" ,backgroundColor:"red"}}
                                className="button mr-3 mt-3 is-info is-rounded"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Modal Service */}
                    <Modal
                      open={openService}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={modalcss}>
                        <div>
                          <form action="" method="post" className="editService">
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
                                  onClick={handleCloseService}
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
