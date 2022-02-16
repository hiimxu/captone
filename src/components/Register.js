import { React, useState } from "react";
import { validPassword, validEmail, validPhone } from "../validations/regex";

export default function Register() {
  //create useState
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  const [account, setAccount] = useState({});

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [confirmPwdError, setConfirmPwdError] = useState(false);
  //validate
  const [pwdErr, setPwdErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);

  //style
  const formContent = {
    padding: "5%",
    marginBottom: "2%",
  };

  const btnSubmit = {
    border: "none",
    borderRadius: "0.5rem",
    padding: "1%",
    width: "20%",
    cursor: "pointer",
    background: "#0062cc",
    color: "#fff",
  };

  //function
  const handleUsername = (e) => {
    setUsername(e.target.value);
    setSubmitted(false);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
  const handleCPassword = (e) => {
    setConfirmPwd(e.target.value);
    setSubmitted(false);
  };
  const handleFirstname = (e) => {
    setFirstName(e.target.value);
    setSubmitted(false);
  };
  const handleLastname = (e) => {
    setLastName(e.target.value);
    setSubmitted(false);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setSubmitted(false);
  };
  const handleDob = (e) => {
    setDob(e.target.value);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPwdErr(false);
    setEmailErr(false);
    setPhoneErr(false);
    setConfirmPwdError(false);
    setError(false);
    const newAccount = {
      username: username,
      password: password,
      firtname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      dob: dob.split("-").join("/"),
    };

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      firstname === "" ||
      lastname === "" ||
      phone === "" ||
      dob === ""
    ) {
      setError(true);
      return;
    }
    if (!validPassword.test(password)) {
      setPwdErr(true);
      
    }
    if (confirmPwd !== password) {
      setConfirmPwdError(true);
      
    }
    if (!validEmail.test(email)) {
      setEmailErr(true);
      
    }
    if (!validPhone.test(phone)) {
      setPhoneErr(true);
      
    }
    if (!error && !pwdErr && !emailErr && !phoneErr && !confirmPwdError) {
      setSubmitted(true);
      setAccount(() => {
        return newAccount;
      });
    }
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <p className="text-success">
          User {firstname} {lastname} successfully registered!!
        </p>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <p className="text-danger">Please enter all the fields</p>
      </div>
    );
  };

  //render screen
  return (
    <div>
      <div>
        <h1>User Registration</h1>
      </div>
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
      <div className="container register-form">
        <div className="form">
          <form style={formContent}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    value={username}
                    onChange={handleUsername}
                    placeholder="Username"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={handlePassword}
                    placeholder="Password"
                  />
                  {pwdErr && (
                    <p className="text-danger">Your password is invalid!</p>
                  )}
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="password"
                    value={confirmPwd}
                    onChange={handleCPassword}
                    placeholder="Confirm your password"
                  />
                  {confirmPwdError && (
                    <p className="text-danger">
                      The entered passwords do not match. Try again.
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={handleEmail}
                    placeholder="Email"
                  />
                  {emailErr && (
                    <p className="text-danger">Your email is invalid!</p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    value={firstname}
                    onChange={handleFirstname}
                    placeholder="First name"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    value={lastname}
                    onChange={handleLastname}
                    placeholder="Last name"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    value={phone}
                    onChange={handlePhone}
                    placeholder="Phone number"
                  />
                  {phoneErr && (
                    <p className="text-danger">Your phone is invalid!</p>
                  )}
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="date"
                    value={dob}
                    onChange={handleDob}
                    placeholder="Date of birth"
                  />
                </div>
              </div>
            </div>
            <button style={btnSubmit} type="submit" onClick={handleSubmit}>
              Submit
            </button>

            {console.log(account)}
          </form>
        </div>
      </div>
    </div>
  );
}
