import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";

export default function Navigation() {
  const [navbar, setNavbar] = useState({});
  const [menu, setMenu] = useState({
    fontSize: "1.2rem",
    color: "white",
    paddingLeft: "25%",
  });
  const [sign, setSign] = useState({
    color: "white",
    positon: "right",
    paddingLeft: "20%",
  });
  const [logo, setLogo] = useState({ width: "100%", height: "5rem" });
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
          width:"100%",
          height:"4rem",
          paddingTop:"0.7rem"
        });
        setMenu({
          fontSize: "1rem",
          color: "white",
          paddingLeft: "25%",
        })
        setSign({
          color: "#ffd933",
          positon: "right",
          paddingLeft: "20%",
          paddingTop:"1rem"
        }

        )
      } else {
        setNavbar({
          backgroundColor: "rgb(28, 23, 1, 0.1)",
        });
        setLogo({
          width:"100%",
          height:"5rem"
        });
        setMenu({
          fontSize: "1.2rem",
          color: "white",
          paddingLeft: "25%",
        })
        setSign({
          color: "white",
          positon: "right",
          paddingLeft: "20%",
        }

        )
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div>      
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top font-weight-bold"
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
                Favorite
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about">
                <img src={logoImg} style={logo} />
              </Link>
            </li>
            <li className="nav-item p-4">
              <Link className="text-reset" to="/history">
                History
              </Link>
            </li>
            <li className="text-reset" className="nav-item p-4">
              <Link className="text-reset" to="/location">
                Location
              </Link>
            </li>
          </ul>
          <ul className="menu navbar-nav fixed-right" style={sign}>
            <li className="nav-item p-1">
              <Link className="text-reset" to="/login">
                Sign in
              </Link>
            </li>
            <li className="nav-item p-1">
              <p className="text-white">|</p>
            </li>
            <li className="nav-item p-1">
              <Link className="text-reset" to="/register">
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
