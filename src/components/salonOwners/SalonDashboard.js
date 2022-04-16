import { Link } from "react-router-dom";
import paperbg from "../../assets/paperbg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import { logout } from "../../redux/actions/creators/auth";
// import salonFixedData from "../salonOwners/DashboardData.json";

import { useDispatch, useSelector } from "react-redux";

import {
  getSalonBookingHistory,
  resetSalonBookingHistoryList,
  getScheduleCurrent,
  resetScheduleCurentList,
} from "../../redux/actions/creators/salon";
import {
  convertISOStringToLocaleDateString,
  convertISOStringToLocaleTimeString,
  currencyFormatter,
} from "../../utils";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { setDay } from "date-fns";

export default function SalonDashboard() {
  const link = {
    fontSize: "20px",
    color: "white",
  };
  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
  };
  // const fakeDashboardData = salonFixedData;

  const menuStyle = {
    height: "100%",
    backgroundColor: "rgb(0, 82, 189, 95%)",
    width: "9%",
    position: "fixed",
    top: 0,
    left: 0,
    overflowX: "hidden",
    fontWeight: "bold"
  };
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );

  // -- LOG OUT --
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.loginAccount);
  const handleLogout = () => {
    dispatch(logout("token"));
  };

  // -- MODAL --
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    borderRadius: "25px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [openFinish, setOpenFinish] = React.useState(false);
  const handleOpenFinish = () => setOpenFinish(true);
  const handleCloseFinish = () => setOpenFinish(false);
  const [openCancel, setOpenCancel] = React.useState(false);
  const handleOpenCancel = () => setOpenCancel(true);
  const handleCloseCancel = () => setOpenCancel(false);

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

  // -- GET HISTORY DATA --
  const { historyBooking } = useSelector((state) => state.salonHistory);
  const [day, setDay] = useState(new Date().toISOString().substring(0, 10));
  const [dayFormated, setDayFormated] = useState({
    day: convertDate(day),
  });
  const handleSelectDateHistory = (e) => {
    setDay(e.target.value);
    setDayFormated({ day: convertDate(e.target.value) });
  };
  useEffect(() => {
    dispatch(getSalonBookingHistory(token, dayFormated));
    return () => {
      dispatch(resetSalonBookingHistoryList());
    };
  }, [dispatch, token, dayFormated]);

  //-- GET CURRENT DATA --
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [dateFormated, setDateFormated] = useState({
    day: convertDate(date),
    nameStaff: "",
  });
  const { currentSchedule } = useSelector((state) => state.scheduleCurent);
  console.log("CURRENT SCHEDULE" + currentSchedule);
  useEffect(() => {
    dispatch(getScheduleCurrent(token, dateFormated));
    return () => {
      dispatch(resetScheduleCurentList());
    };
  }, [dispatch, token, dateFormated]);
  const handleFinish = (e) => {
    e.preventDefault();
    console.log("finish");
  };
  const handleCancel = (e) => {
    e.preventDefault();
    console.log("cancel");
  };
  const handleSelectDate = (e) => {
    setDate(e.target.value);
    setDateFormated({ day: convertDate(e.target.value), nameStaff: "" });
    console.log(date);
  };
  function convertDate(date) {
    var newdate = new Date(date),
      mnth = ("0" + (newdate.getMonth() + 1)).slice(-2),
      day = ("0" + newdate.getDate()).slice(-2);
    return [newdate.getFullYear(), mnth, day].join("-");
  }

  return (
    <div>
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
      </div>
      <div style={root}>
        <div
          className="columns"
          style={{
            minHeight: "400px",
            // , marginTop: "96px"
          }}
        >
          <div className="column is-2"></div>
          <div
            className="column is-8"
            style={{
              background: "url(" + paperbg + ")",
              padding: 0,
              marginTop: "30px",
              marginBottom: "30px",
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
                  <Tab label="Current Order" value="1" />
                  <Tab label="History" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                {" "}
                <div className="mb-5">
                  <input
                    style={{ width: "400px" }}
                    className="input is-normal"
                    placeholder="Normal input"
                    type="date"
                    value={date}
                    onChange={handleSelectDate}
                  ></input>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <p title="stt">#</p>
                      </th>{" "}
                      <th>
                        <p title="CustomerName">Customer</p>
                      </th>
                      <th>
                        <p title="Order">Order</p>
                      </th>
                      <th>
                        <p title="Time">Time</p>
                      </th>
                      <th>
                        <p title="Stylist">Stylist</p>
                      </th>
                      <th>
                        <p title="Status">Status</p>
                      </th>
                      <th className="has-text-centered">
                        <p title="Actions">Actions</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSchedule?.map((element) => (
                      <tr>
                        <th>{currentSchedule.indexOf(element) + 1}</th>

                        <td>
                          {" "}
                          <span className="is-size-5 has-text-weight-semibold has-text-info-dark">
                            {element.nameCustomer}
                          </span>
                          <p>
                            {" "}
                            {element.phone ? element.phone : "Salon booked"}
                          </p>
                        </td>
                        <td className="has-text-weight-bold">
                          {element.nameService}
                        </td>
                        <td>
                          {" "}
                          {convertISOStringToLocaleTimeString(
                            element.timeUse
                          ).slice(0, -3)}
                        </td>
                        <td>{element.nameStaff}</td>
                        <td className="has-text-link has-text-weight-bold">
                          {element.nameStatus}
                        </td>

                        <td className="has-text-centered has-text-white">
                          <button
                            className="button is-rounded is-success mr-2"
                            onClick={handleOpenFinish}
                          >
                            <i className="fa-solid fa-circle-check"></i>
                          </button>
                          <button
                            className="button is-rounded is-danger mr-2"
                            onClick={handleOpenCancel}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Modal
                  open={openFinish}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div className="has-text-centered">
                      <h1 className="is-size-4 has-text-weight-semibold">
                        {" "}
                        Do you want to{" "}
                        <span className="has-text-info">finish</span> this order
                        ?
                      </h1>
                      <br></br>
                      <button
                        onClick={handleFinish}
                        className="button is-rounded is-info mr-5"
                        style={{ width: "150px" }}
                      >
                        Finish order
                      </button>
                      <button
                        onClick={handleCloseFinish}
                        className="button is-rounded is-danger ml-5"
                        style={{ width: "150px" }}
                      >
                        Cancel
                      </button>
                    </div>
                  </Box>
                </Modal>
                <Modal
                  open={openCancel}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div className="has-text-centered">
                      <h1 className="is-size-4 has-text-weight-semibold">
                        {" "}
                        Do you want to{" "}
                        <span className="has-text-danger">cancel</span> this
                        order ?
                      </h1>
                      <br></br>
                      <button
                        onClick={handleCancel}
                        className="button is-rounded is-info mr-5"
                        style={{ width: "150px" }}
                      >
                        Cancel order
                      </button>
                      <button
                        onClick={handleCloseCancel}
                        className="button is-rounded is-danger ml-5"
                        style={{ width: "150px" }}
                      >
                        Cancel
                      </button>
                    </div>
                  </Box>
                </Modal>
              </TabPanel>
              <TabPanel value="2">
                <div className="mb-5">
                  <input
                    style={{ width: "400px" }}
                    className="input is-normal"
                    placeholder="Normal input"
                    onChange={handleSelectDateHistory}
                    type="date"
                  ></input>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <p title="stt">#</p>
                      </th>
                      <th>
                        <p title="CustomerName">Customer</p>
                      </th>
                      <th>
                        <p title="Order">Order</p>
                      </th>
                      <th>
                        <p title="Order">Price</p>
                      </th>
                      <th>
                        <p title="Date">Date</p>
                      </th>
                      <th>
                        <p title="Stylist">Stylist</p>
                      </th>
                      <th className=" has-text-centered">
                        <p title="Status">Status</p>
                      </th>
                      <th>
                        <p title="Note">Note</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyBooking?.map((element) => (
                      <tr>
                        <th>{historyBooking?.indexOf(element) + 1}</th>
                        <td>
                          <span className="is-size-5 has-text-weight-semibold has-text-info-dark">
                            {element.nameCustomer}
                          </span>
                          <p>
                            {" "}
                            {element.phone ? element.phone : "Salon booked"}
                          </p>
                        </td>{" "}
                        <td>
                          <span className="has-text-weight-bold">
                            {" "}
                            {element.nameService}
                          </span>
                          <p>{element.service_time} minutes</p>
                        </td>{" "}
                        <td>
                          <span className="has-text-danger">
                            {" "}
                            {currencyFormatter.format(element.price_original)}
                          </span>
                        </td>
                        <td>
                          {" "}
                          <span className="has-text-weight-bold">
                            Date:
                          </span>{" "}
                          {convertISOStringToLocaleDateString(element.timeUse)}
                          <p>
                            <span className="has-text-weight-bold">Time:</span>{" "}
                            {convertISOStringToLocaleTimeString(
                              element.timeUse
                            ).slice(0, -3)}
                          </p>
                        </td>
                        <td>{element.nameStaff}</td>
                        {element.nameStatus === "finished" && (
                          <td className="has-text-success is-size-4 has-text-weight-bold has-text-centered">
                            <i className="fa-solid fa-check"></i>
                          </td>
                        )}{" "}
                        {element.nameStatus === "cancelled" && (
                          <td className="has-text-danger is-size-4 has-text-weight-bold has-text-centered">
                            <i class="fa-solid fa-xmark"></i>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>
            </TabContext>
          </div>
          <div className="column is-2"></div>
        </div>
      </div>
    </div>
  );
}
