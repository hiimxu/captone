import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/creators/auth";

export default function Navigation() {
  const [navbar, setNavbar] = useState({
    backgroundColor: "rgb(28, 23, 1, 0.1)",
  });
  const [menu, setMenu] = useState({
    fontSize: "1.2rem",
    color: "white",
    paddingLeft: "22%",
  });
  const [sign, setSign] = useState({
    color: "white",
    positon: "right",
    paddingLeft: "20%",
  });
  const [logo, setLogo] = useState({ width: "100%", height: "5rem" });
  const { account } = useSelector((state) => state.loginAccount);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout("token"));
  };
  useEffect(() => {
    const handleScroll = () => {
      //console.log(window.scrollY);

      if (window.scrollY >= 80) {
        setNavbar({
          backgroundColor: "black",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%,rgba(0,0,0,0) 100%)",
          height: "4rem",
        });
        setLogo({
          width: "100%",
          height: "4rem",
          paddingTop: "0.7rem",
        });
        setMenu({
          fontSize: "1rem",
          color: "white",
          paddingLeft: "22%",
        });
        setSign({
          color: "#ffd933",
          positon: "right",
          paddingLeft: "20%",
          paddingTop: "1rem",
        });
      } else {
        setNavbar({
          backgroundColor: "rgb(28, 23, 1, 0.1)",
        });
        setLogo({
          width: "100%",
          height: "5rem",
        });
        setMenu({
          fontSize: "1.2rem",
          color: "white",
          paddingLeft: "22%",
        });
        setSign({
          color: "white",
          positon: "right",
          paddingLeft: "20%",
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg is-fixed-top fixed-top font-weight-bold"
        style={navbar}
      >
        <div className="justify-content-center navbar-collapse text">
          <ul className="menu navbar-nav ml-5" style={menu}>
            <li className="nav-item p-4">
              <Link className="text-reset" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item p-4 ">
              <Link className="text-reset" to="/favorite">
                Recent
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about">
                <img src={logoImg} alt="logo" style={logo} />
              </Link>
            </li>
            <li className="nav-item p-4">
              <Link className="text-reset" to="/history">
                History
              </Link>
            </li>
            <li className="text-reset nav-item p-4">
              <Link className="text-reset" to="/profile">
                Profile
              </Link>
            </li>
          </ul>
          {account ? (
            <ul className="menu navbar-nav fixed-right" style={sign}>
              <li className="nav-item p-1">
                <Link className="text-reset" to="/">
                  <button className="border-0 rounded" onClick={handleLogout}>
                    Logout
                  </button>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="menu navbar-nav fixed-right" style={sign}>
              <li className="nav-item p-1">
                <Link className="text-reset" to="/register">
                  <button className="button is-dark">Sign up</button>
                </Link>
              </li>
              <li className="nav-item p-1">
                <div
                  class="vl"
                  style={{
                    borderLeft: 2 + "px solid white",
                    height: 40 + "px",
                  }}
                ></div>
              </li>
              <li className="nav-item p-1">
                <Link className="text-reset" to="/login">
                  <button className="button is-dark is-outlined is-inverted">
                    Log in
                  </button>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}
