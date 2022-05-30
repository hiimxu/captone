import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bgImg from "../../assets/introbg-1.jpg";
import { districts, times } from "../../assets/data/data.js";
import { validPassword, validEmail, validPhone } from "../../validations/regex";
import { registerSalon } from "../../redux/actions/creators/auth/index";
import { useDispatch, useSelector } from "react-redux";

export default function RegisterSalon() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [email, setEmail] = useState("");
  const [nameSalon, setNameSalon] = useState("");
  const [phone, setPhone] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("Hanoi");
  const [dedtailAddress, setDetailAddress] = useState("");
  const [timeOpen, setTimeOpen] = useState("");
  const [timeClose, setTimeClose] = useState("");
  const [salonImage, setSalonImage] = useState("");
  const [salonDescription, setSalonDescription] = useState("");
  const [nameOwner, setNameOwner] = useState("");

  //error
  const [error, setError] = useState(false);
  const [confirmPwdError, setConfirmPwdError] = useState(false);
  //validation
  const [pwdErr, setPwdErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);

  //registerSalon
  const { registeredSalon, errMess, successMessage } = useSelector(
    (state) => state.registerSalon
  );
  const dispatch = useDispatch();

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
    fontSize: "1.3rem",
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleCPassword = (e) => {
    setConfirmPwd(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleNameSalon = (e) => {
    setNameSalon(e.target.value);
  };
  const handleDetailAddress = (e) => {
    setDetailAddress(e.target.value);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };
  const handleTaxCode = (e) => {
    setTaxCode(e.target.value);
  };
  const handleTimeOpen = (e) => {
    setTimeOpen(e.target.value);
  };

  const handleTimeClose = (e) => {
    setTimeClose(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleSalonImage = (e) => {
    setSalonImage(e.target.value);
  };
  const handleNameOwner = (e) => {
    setNameOwner(e.target.value);
  };
  const handleSalonDescription = (e) => {
    setSalonDescription(e.target.value);
  };

  const resetForm = () => {
    setUserName("");
    setPassword("");
    setConfirmPwd("");
    setNameSalon("");
    setEmail("");
    setPhone("");
    setTaxCode("");
    setDistrict("");
    setCity("Hanoi");
    setDetailAddress("");
    setTimeOpen("");
    setTimeClose("");
    setSalonImage("");
    setNameOwner("");
    setSalonDescription("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPwdErr(false);
    setEmailErr(false);
    setPhoneErr(false);
    setConfirmPwdError(false);
    setError(false);

    const newSalon = {
      account_name: username,
      password: password,
      email: email,
      phone: phone,
      nameSalon: nameSalon,
      detailAddress: dedtailAddress,
      city: city,
      district: district,
      taxCode: taxCode,
      timeOpen: timeOpen,
      timeClose: timeClose,
      role: "salon",
      image: salonImage,
      description: salonDescription,
      nameOwner: nameOwner,
    };
    let pass = true;
    if (
      username === "" ||
      password === "" ||
      confirmPwd === "" ||
      nameSalon === "" ||
      email === "" ||
      phone === "" ||
      taxCode === "" ||
      district === "" ||
      city === "" ||
      timeOpen === "" ||
      timeClose === "" ||
      salonImage === "" ||
      salonDescription === "" ||
      nameOwner === ""
    ) {
      setError(true);
      pass = false;
      return;
    }
    if (!validPassword.test(password)) {
      setPwdErr(true);
      pass = false;
      
    }
    if (confirmPwd !== password) {
      setConfirmPwdError(true);
      pass = false;
      
    }
    if (!validEmail.test(email)) {
      setEmailErr(true);
      pass = false;
      
    }
    if (!validPhone.test(phone)) {
      setPhoneErr(true);
      pass = false;
      
    }
    if (pass) {
      dispatch(registerSalon(newSalon));
    }
    // console.log(newSalon)
  };
  useEffect(() => {
    if (successMessage) {
      resetForm();
    }
  }, [successMessage]);

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
                      <h2
                        className="text-center mb-5 pt-5 pb-5"
                        style={{ fontSize: "1.7rem", fontWeight: "bold" }}
                      >
                        Đăng ký trở thành salon đối tác
                      </h2>
                      <div className="messages">
                        {error && (
                          <div className="error">
                            <p className="text-danger">
                              Vui lòng điến đầy đủ thông tin!
                            </p>
                          </div>
                        )}
                        {errMess && (
                          <div className="error">
                            <p className="text-danger">{errMess}</p>
                          </div>
                        )}
                        {successMessage && (
                          <div className="success">
                            <p className="text-success">
                              {successMessage}: {registeredSalon?.account_name}
                            </p>
                          </div>
                        )}
                      </div>
                      <form>
                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                Tên đăng nhập*
                              </span>
                            </div>
                            <input
                              value={username}
                              type="text"
                              className="form-control"
                              maxLength={40}
                              onChange={handleUserName}
                            />
                          </div>
                        </div>
                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                Mật khẩu*
                              </span>
                            </div>
                            <input
                              value={password}
                              type="password"
                              className="form-control"
                              maxLength={40}
                              onChange={handlePassword}
                            />
                          </div>
                          {pwdErr && (
                            <p className="text-danger">
                              Mật khẩu phải từ 8 đến 40 ký tự, trong đó có chứa
                              ít nhất 1 chữ cái viết hoa, một chữ cái viết
                              thướng và 1 số.
                            </p>
                          )}
                        </div>

                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                Nhập lại mật khẩu*
                              </span>
                            </div>
                            <input
                              value={confirmPwd}
                              maxLength={40}
                              type="password"
                              className="form-control"
                              onChange={handleCPassword}
                            />
                          </div>
                          {confirmPwdError && (
                            <p className="text-danger">
                              Mật khẩu không trùng khớp, vui lòng kiểm tra lại!
                            </p>
                          )}
                        </div>
                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                Tên salon*
                              </span>
                            </div>
                            <input
                              value={nameSalon}
                              type="text"
                              className="form-control"
                              maxLength={40}
                              onChange={handleNameSalon}
                            />
                          </div>
                        </div>
                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                Tên chủ salon*
                              </span>
                            </div>
                            <input
                              value={nameOwner}
                              type="text"
                              className="form-control"
                              maxLength={40}
                              onChange={handleNameOwner}
                            />
                          </div>
                        </div>
                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                Email*
                              </span>
                            </div>
                            <input
                              value={email}
                              type="text"
                              className="form-control"
                              maxLength={40}
                              onChange={handleEmail}
                            />
                          </div>
                          {emailErr && (
                            <p className="text-danger">
                              Địa chỉ email của bạn không chính xác!
                            </p>
                          )}
                        </div>

                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                SĐT*
                              </span>
                            </div>
                            <input
                              value={phone}
                              type="text"
                              className="form-control"
                              maxLength={40}
                              onChange={handlePhone}
                            />
                          </div>
                          {phoneErr && (
                            <p className="text-danger">
                              Số điện thoại không hợp lệ.
                            </p>
                          )}
                        </div>

                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                Mã số thuế*
                              </span>
                            </div>

                            <input
                              value={taxCode}
                              type="text"
                              className="form-control"
                              maxLength={40}
                              onChange={handleTaxCode}
                            />
                          </div>
                        </div>

                        <div className="form-outline mb-4">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <label
                                className="input-group-text"
                                htmlFor="inputGroupSelect01"
                              >
                                Quận*
                              </label>
                            </div>
                            <select
                              className="custom-select"
                              id="inputGroupSelect01"
                              value={district}
                              onChange={handleDistrict}
                            >
                              <option defaultValue={""}>Chọn Quận/Huyện</option>
                              {districts.map((district) => (
                                <option
                                  key={district.toString()}
                                  value={district}
                                >
                                  {district}
                                </option>
                              ))}
                            </select>
                            <div className="input-group-prepend ml-3">
                              <label
                                className="input-group-text"
                                htmlFor="inputGroupSelect02"
                              >
                                Thành phố*
                              </label>
                            </div>
                            <select
                              className="custom-select"
                              id="inputGroupSelect02"
                              value={city}
                              onChange={handleCity}
                            >
                              <option value="1">Hanoi</option>
                            </select>
                          </div>
                        </div>

                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                Địa chỉ cụ thể*
                              </span>
                            </div>
                            <input
                              value={dedtailAddress}
                              type="text"
                              className="form-control"
                              maxLength={400}
                              onChange={handleDetailAddress}
                            />
                          </div>
                        </div>
                        <div className="form-outline mb-4">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <label
                                className="input-group-text"
                                htmlFor="inputGroupSelect03"
                              >
                                Mở cửa*
                              </label>
                            </div>
                            <select
                              className="custom-select"
                              id="inputGroupSelect03"
                              value={timeOpen}
                              onChange={handleTimeOpen}
                            >
                              <option defaultValue={""}>Chọn giờ mở cửa...</option>
                              {times.map((time) => (
                                <option key={time.toString()} value={time}>
                                  {time}
                                </option>
                              ))}
                            </select>
                            <div className="input-group-prepend ml-3">
                              <label
                                className="input-group-text"
                                htmlFor="inputGroupSelect04"
                              >
                                Đóng cửa*
                              </label>
                            </div>
                            <select
                              className="custom-select"
                              id="inputGroupSelect04"
                              value={timeClose}
                              onChange={handleTimeClose}
                            >
                              <option value={""}>Chọn giờ đóng cửa...</option>
                              {times.map((time) => (
                                <option key={time.toString()} value={time}>
                                  {time}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                Ảnh đại diện của salon*
                              </span>
                            </div>
                            {/* <input
                              value={salonImage}
                              type="text"
                              className="form-control"
                              maxLength={2000}
                              onChange={handleSalonImage}
                            /> */}
                            <input type="file" accept=".png, .jpg, .jpeg" onChange={(e) => { 
                            setSalonImage( e.target.files[0])
                           }} />
                          </div>
                        </div>
                        <div className="">
                          <div className="form-group text-left">
                            <label className="pl-2">Mô tả về salon của bạn*:</label>
                            <textarea
                              value={salonDescription}
                              type="text"
                              className="form-control"
                              maxLength={2000}
                              onChange={handleSalonDescription}
                              placeholder="Nhập mô tả tại đây"
                              style={{ minHeight: "10rem" }}
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center">
                          <button
                            type="submit"
                            style={btnSubmit}
                            onClick={handleSubmit}
                          >
                            Đăng ký
                          </button>
                        </div>

                        <p className="text-center text-muted mt-5 mb-0">
                          Bạn đã có tài khoản?{" "}
                          <Link to="/login" className="fw-bold text-body">
                            <u>Đăng nhập tại đây</u>
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
