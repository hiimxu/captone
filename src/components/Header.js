import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import titlebig from "../assets/titlebig.svg";
import Background from "../assets/headerhome.jpg";

export default function Header() {
  const root = {
    paddingBottom: "2rem",
  };
  const masthead = {
    backgroundImage: `url(${Background})`,
    backgroundColor: "black",
    paddingTop: "12rem",
    paddingBottom: "9rem",
    textAlign: "center",
    backgroundRepeat: "no-repeat",
    background_attchment: "scroll",
    backgroundPosition: "top",
    backgroundSize: "cover",
  };
  const mastheadHeading = {
    fontSize: "7rem",
  };
  const mastheadSubheading = {
    with: "50rem",
    height: "6rem",
  };
  const mastheadSubheadingBottom = {
    with: "50rem",
    height: "6rem",
    transform: "rotate(180deg)",
  };
  const navbar = {
    borderBottom: "solid 1px #c69853",
  };
  const menu = {
    fontSize: "1.2rem",
    color: "white",
    paddingLeft:"25%"
  };
  const sign ={
      positon:"right",
      paddingLeft:"20%"
  }

  return (
    <div style={root}>
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-dark fixed-top font-weight-bold"
          style={navbar}
        >
          <div className="justify-content-center navbar-collapse text">
            <ul className="menu navbar-nav ml-5" style={menu}>
              <li className="nav-item p-4">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item p-4">
                <Link to="/favorite">Favorite</Link>
              </li>
              <li className="nav-item">
                <Link to="/about">
                  <img src={logo} />
                </Link>
              </li>
              <li className="nav-item p-4">
                <Link to="/history">History</Link>
              </li>
              <li className="nav-item p-4">
                <Link to="/location">Location</Link>
              </li>
              

            </ul>
            <ul className="menu navbar-nav fixed-right" style={sign}>
              <li className="nav-item p-1">
                <Link to="/login">Sign in</Link>
              </li>
              <li className="nav-item p-1">
                <p className="text-white">|</p>
              </li>
              <li className="nav-item p-1">
                <Link to="/register">Sign up</Link>
              </li>
            </ul>
          </div>
        </nav>
        <header style={masthead}>
          <div className="container">
            <div>
              <img style={mastheadSubheading} src={titlebig} />
            </div>
            <div className="text-white">
              <h1 style={mastheadHeading}>House of Gentlemen</h1>
              <h4>AN ESTABLISHMENT BY THE GENTLEMEN WITH ATTITUDE</h4>
            </div>
            <div>
              <img style={mastheadSubheadingBottom} src={titlebig} />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
