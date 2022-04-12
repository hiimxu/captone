import { Link } from "react-router-dom";
import paperbg from "../../assets/paperbg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import salonFixedData from "./DashboardData.json";

import * as React from "react";

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
    marginTop: "96px",
  };
  const link = {
    // padding: "6px 8px 6px 16px",
    // textDecoration: "none",
    // fontSize: "1.25rem",
    // display: "block",
    fontSize: "20px",
    color: "white",
  };
  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
  };
  const fakeDashboardData = salonFixedData;
  console.log(fakeDashboardData[2])

  return (
    <div>
      <div style={sideMenu}>
        <aside className="menu">
          <ul className="menu-list">
            <li>
              <Link
                onMouseOver={changeMouseOver}
                onMouseOut={changeMouseOut}
                to="/SalonDashboard"
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
                to="/"
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
            
            <h1
            className="is-size-1 has-text-centered mt-5 mb-5"
            >
              Employee table
            </h1>
            <div className="has-text-right mb-5 mr-5">
              <button className="button is-info is-rounded is-outlined"> Add Employee</button>
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
                    {element.status === "Idle" &&
                     <td  className="has-text-link-dark">{element.status}</td>
                    }
                    {element.status === "Occupied" &&
                     <td  className="has-text-danger-dark">{element.status}</td>
                    }
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

            <div className="column is-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
