import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImgCard from "../assets/videobg.jpg";
import bgImg from "../assets/introbg-1.jpg";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/creators/auth";

export default function Login() {
  const [userName, setUserName] = useState("customer");
  const [password, setPassword] = useState("123");

  const dispatch = useDispatch();

  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  const loginStyle = {
    backgroundColor: "rgba(0,0,0,0)",
    border: "none",
  };

  return (
    <div style={root}>
      <section className="pt-5 pb-5 text-black">
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={loginStyle}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block"></div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form>
                        <h2
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Sign into your account
                        </h2>

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            placeholder="Username"
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            placeholder="Password"
                          />
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-primary btn-lg btn-block"
                            type="button"
                            onClick={() => {
                              dispatch(login({ username: userName, password }));
                            }}
                          >
                            Login
                          </button>
                        </div>

                        <Link className="small text-primary" to="/">
                          Forgot password?
                        </Link>
                        <p className="mb-5 pb-lg-2">
                          Don't have an account?{" "}
                          <Link to="/register" className="text-primary pl-2">
                            Register here
                          </Link>
                        </p>
                        <Link to="/" className="small text-muted pr-3">
                          Terms of use
                        </Link>
                        <Link to="/" className="small text-muted">
                          Privacy policy
                        </Link>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
