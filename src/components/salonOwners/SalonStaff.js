import { Link } from "react-router-dom";
import paperbg from "../../assets/paperbg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import salonFixedData from "./DashboardData.json";

import { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";

export default function SalonDashboard() {
  const changeMouseOver = (e) => {
    e.target.style.color = "rgb(0, 82, 189)";
  };
  const changeMouseOut = (e) => {
    e.target.style.color = "white";
  };
  const sideMenu = {
    height: "100%",
    backgroundColor: "rgb(0, 82, 189, 95%)",
    width: "3%",
    position: "fixed",
    top: 0,
    left: 0,
    overflowX: "hidden",
    marginTop: "106px",
  };
  const link = {
    fontSize: "20px",
    color: "white",
  };
  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
    marginTop:"106px"
  };
  const fakeDashboardData = salonFixedData;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <div style={sideMenu}>
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
            </li>
            <div
              className="is-divider"
              style={{ width: "80%", color: "grey", margin: "auto" }}
            ></div>
          </ul>
        </aside>
      </div>
      <div style={root}>
        {/* logo */}
        {/* <div>
          <nav
            className="navbar navbar-expand-lg is-fixed-top fixed-top font-weight-bold"
            style={{ backgroundColor: "rgb(0,0,0,90%)" }}
          >
            <div className="justify-content-center navbar-collapse text">
              <ul className="menu navbar-nav ml-5">
                <li className="nav-item">
                  <Link to="/about">
                    <img
                      src={logoImg}
                      alt="logo"
                      style={{ width: "100%", height: "5rem" }}
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div> */}

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
            <h1 className="is-size-1 has-text-centered mt-5 mb-5">
              Employee table
            </h1>
            <div className="has-text-right mb-5 mr-5">
              <button
                className="button is-info is-rounded is-outlined"
                onClick={handleOpen}
              >
                {" "}
                Add Employee
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <p title="stt">#</p>
                  </th>
                  <th>
                    <p title="EmployeeName">Employee's Name</p>
                  </th>
                  <th>
                    <p title="EmployeeTitle">Employee's Title</p>
                  </th>
                  <th>
                    <p title="Phone">Phone</p>
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
                {fakeDashboardData[2]?.map((element) => (
                  <tr>
                    <th>{element.stt}</th>
                    <td>{element.employeeName}</td>
                    <td>{element.employeeTitle}</td>
                    <td>{element.phone}</td>
                    {element.status === "Idle" && (
                      <td className="has-text-link-dark">{element.status}</td>
                    )}
                    {element.status === "Occupied" && (
                      <td className="has-text-danger-dark">{element.status}</td>
                    )}
                    <td className="has-text-centered">
                      <button className="button is-rounded is-primary mr-5">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button className="button is-rounded is-danger">
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="column is-2"></div>
        </div>
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
                <div className="has-text-right" style={{marginRight: "100px"}}>
                  <label for="Name">Employee's name:</label>
                  <input
                    id="Student"
                    className="input w-50 ml-5"
                    style={{ height: "30px" }}
                    type="text"
                    placeholder="Text input"
                  />
                  <br></br>
                  <label className="mt-5" for="Title">Employee's title:</label>
                  <input
                    id="Title"
                    className="input mt-5 w-50 ml-5"
                    style={{ height: "30px" }}
                    type="text"
                    placeholder="Text input"
                  />{" "}
                  <br></br>
                  <label className="mt-5" for="Phone">Employee's phone:</label>
                  <input
                    id="Phone"
                    className="input w-50 mt-5 ml-5"
                    style={{ height: "30px" }}
                    type="text"
                    placeholder="Text input"
                  />{" "}
                  <br></br>
                  <label className="mt-5" for="Address">Employee's address:</label>
                  <input
                    id="Address"
                    className="input w-50 mt-5 ml-5"
                    style={{ height: "30px" }}
                    type="text"
                    placeholder="Text input"
                  />{" "}
                  <br></br>
                  <label className="mt-5" for="License">Employee's license:</label>
                  <input id="License" className="mt-5 ml-5" type="file" />
                </div>{" "}
                <br></br>
                <div className="has-text-right">
                  <button className="button is-rounded is-danger" onClick={handleClose}>
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
      {/*  */}
    </div>
  );
}
