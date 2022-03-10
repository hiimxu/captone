import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImg from "../../assets/introbg-1.jpg";

export default function RegisterSalon() {
  // const newSalon = {
  //     account_name: username,
  //     password: password,
  //     email: email,
  //     role: "salon",
  //     nameSalon: nameSalon,
  //     phone:phone,
  //     possibility:1,
  //     TaxCode: taxCode
  // }
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [email, setEmail] = useState("");
  const [nameSalon, setNameSalon] = useState("");
  const [phone, setPhone] = useState("");
  const [taxCode, setTaxCode] = useState("");

  const root = {
    textAlign: "center",
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  const btnSubmit = {
    border: "none",
    borderRadius: "0.5rem",
    padding: "1%",
    marginTop: "2rem",
    width: "30%",
    height: "2.6rem",
    cursor: "pointer",
    background: "#0062cc",
    color: "#fff",
    fontSize: "1.3rem"
  };

  return (
    <div style={root}>
      <div className="container register-form ">
        <section className=" bg-image ">
          <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div
                    className="card bg-transparent"
                    style={{ borderRadius: "15px", border: "none" }}
                  >
                    <div className="card-body p-5">
                      <h2 className="text-center mb-5">
                        Become a partner of our program
                      </h2>
                      <form>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            value={username}
                            placeholder="Username*"
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            value={password}
                            placeholder="Password*"
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            value={confirmPwd}
                            placeholder="Confirm your password*"
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            value={nameSalon}
                            placeholder="Salon's name*"
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            value={email}
                            placeholder="Email*"
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            value={phone}
                            placeholder="Phone number*"
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            value={taxCode}
                            placeholder="Tax code*"
                          />
                        </div>

                        <div className="d-flex justify-content-center">
                          <button type="submit" style={btnSubmit}>
                            Register
                          </button>
                        </div>

                        <p className="text-center text-muted mt-5 mb-0">
                          Have already an account?{" "}
                          <Link to="/login" className="fw-bold text-body">
                            <u>Login here</u>
                          </Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
