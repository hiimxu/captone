import { Link } from "react-router-dom";
import paperbg from "../../assets/paperbg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import salonFixedData from "./DashboardData.json";
import { logout } from "../../redux/actions/creators/auth";
import {
  getListStaffForSalon,
  resetListStaffOfSalon,
} from "../../redux/actions/creators/salon";

import { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function SalonDashboard() {
  const changeMouseOver = (e) => {
    e.target.style.color = "rgb(0, 82, 189)";
  };
  const changeMouseOut = (e) => {
    e.target.style.color = "white";
  };
  const sideMenu = {
    height: "100%",
    backgroundColor: "#000d6b",
    width: "9%",
    position: "fixed",
    top: 0,
    left: 0,
    overflowX: "hidden",
    fontWeight: "bold",
  };
  const link = {
    fontSize: "20px",
    color: "white",
  };
  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
  };
  const fakeDashboardData = salonFixedData;

  // -- GET DATA --
  const dispatch = useDispatch();
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );
  const { listStaff } = useSelector((state) => state.listStaffSalon);
  useEffect(() => {
    dispatch(getListStaffForSalon(token));
    return () => {
      dispatch(resetListStaffOfSalon());
    };
  }, [dispatch, token]);

  // -- MODAL --
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // -- LOG OUT --
  const { account } = useSelector((state) => state.loginAccount);
  const handleLogout = () => {
    dispatch(logout("token"));
  };
  return (
    <div>
      {/* <div style={sideMenu}>
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
      </div> */}
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
            <h1 className="is-size-1 has-text-centered mt-5 mb-5">
              Employee table
            </h1>
            <div className="has-text-right mb-5 mr-5">
              <button
                className="button is-info is-rounded"
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
                  <th className="has-text-centered">
                    <p title="Actions">Actions</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {listStaff?.map((element) => (
                  <tr key={element.staffId}>
                    <th scope="row">{listStaff.indexOf(element) + 1}</th>
                    <td>{element.name}</td>
                    <td>{element.title}</td>
                    <td>{element.phone}</td>

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
                <div
                  className="has-text-right"
                  style={{ marginRight: "100px" }}
                >
                  <label for="Name">Employee's name:</label>
                  <input
                    id="Name"
                    className="input w-50 ml-5"
                    style={{ height: "30px" }}
                    type="text"
                    placeholder="Text input"
                  />
                  <br></br>
                  <label className="mt-5" for="Title">
                    Employee's title:
                  </label>
                  <input
                    id="Title"
                    className="input mt-5 w-50 ml-5"
                    style={{ height: "30px" }}
                    type="text"
                    placeholder="Text input"
                  />{" "}
                  <br></br>
                  <label className="mt-5" for="Phone">
                    Employee's phone:
                  </label>
                  <input
                    id="Phone"
                    className="input w-50 mt-5 ml-5"
                    style={{ height: "30px" }}
                    type="text"
                    placeholder="Text input"
                  />{" "}
                  <br></br>
                  <label className="mt-5" for="Address">
                    Employee's address:
                  </label>
                  <input
                    id="Address"
                    className="input w-50 mt-5 ml-5"
                    style={{ height: "30px" }}
                    type="text"
                    placeholder="Text input"
                  />{" "}
                  <br></br>
                  <label className="mt-5" for="License">
                    Employee's license:
                  </label>
                  <input id="License" className="mt-5 ml-5" type="file" />
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
      {/*  */}
    </div>
  );
}
