import paperbg from "../../assets/paperbg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import imageUnavailable from "../../assets/image-unavailable.png";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileOfSalon } from "../../redux/actions/creators/salon";
import { Modal, Box } from "@mui/material";
import { logout } from "../../redux/actions/creators/auth";

export default function SalonDashboard() {
  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
  };
  // const profileSalon = {
  //   salonId: "1",
  //   salonName: "Golden Scissor",
  //   taxCode: "6234vs02hf82",
  //   phone: "092 312 5123",
  //   timeOpen: "07:30:00",
  //   timeClose: "20:00:00",
  //   address: "Ba Đình, Hà Nội",
  //   email: "salon.goldenscissor@gmail.com",
  //   image:
  //     "https://camnanghaiphong.vn/wp-content/uploads/2022/02/Top-10-tiem-salon-toc-chat-luong-Hai-Phong.jpg",
  // };
  const dispatch = useDispatch();

  // -- GET SALON PROFILE --
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );
  const { profileSalon } = useSelector((state) => state.profileSalon);
  useEffect(() => {
    dispatch(getProfileOfSalon(token));
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
            className="column is-8  has-text-centered "
            style={{
              background: "url(" + paperbg + ")",
              padding: 0,
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            <h1 className="is-size-1 mt-5 mb-5">Salon Business Information</h1>
            <div className="columns">
              <div className="column is-6 has-text-right">
                <p className="is-size-4">Salon Id : </p>
                <p className="is-size-4">Salon name : </p>
                <p className="is-size-4">Salon owner : </p>
                <p className="is-size-4">Tax code : </p>
                <p className="is-size-4">Phone number : </p>
                <p className="is-size-4">Time open : </p>
                <p className="is-size-4">Time close : </p>
                <p className="is-size-4">District : </p>
                <p className="is-size-4">City : </p>
                <p className="is-size-4">Detail address : </p>
                <p className="is-size-4">Email : </p>
                <p className="is-size-4">Salon image : </p>
              </div>
              <div className="column is-6 has-text-left">
                <p className="is-size-4">{profileSalon[0].salonId}</p>
                <p className="is-size-4">{profileSalon[0].nameSalon}</p>
                <p className="is-size-4"> {profileSalon[0].nameOwner}</p>
                <p className="is-size-4 has-text-primary has-text-weight-bold">
                  {profileSalon[0].taxCode}
                </p>
                <p className="is-size-4">{profileSalon[0].phone}</p>
                <p className="is-size-4 has-text-danger">
                  {profileSalon[0].timeOpen}
                </p>
                <p className="is-size-4 has-text-danger">
                  {profileSalon[0].timeClose}
                </p>
                <p className="is-size-4">{profileSalon[0].district}</p>
                <p className="is-size-4">{profileSalon[0].city}</p>
                <p className="is-size-4">{profileSalon[0].detailAddress}</p>
                <p className="is-size-4 is-underlined">
                  {profileSalon[0].email}
                </p>
                <img
                  style={{
                    maxHeight: "300px",
                    maxWidth: "500px",
                    marginTop: "10px",
                  }}
                  src={
                    profileSalon[0].image
                      ? profileSalon[0].image
                      : imageUnavailable
                  }
                  alt="..."
                ></img>
              </div>
            </div>

            <div className="has-text-centered mb-5 mr-5">
              <button
                className="button is-info is-rounded"
                style={{ width: "200px" }}
                onClick={handleOpen}
              >
                Edit
              </button>
            </div>
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
                  <label for="Name">Salon's name:</label>
                  <input
                    id="name"
                    className="input w-50 ml-5"
                    style={{ height: "30px" }}
                    type="text"
                    placeholder="Text input"
                  />
                  <br></br>
                  <label className=" mt-5" for="taxcode">
                    Tax code:
                  </label>
                  <input
                    id="taxcode"
                    className="input w-50 mt-5 ml-5"
                    style={{ height: "30px" }}
                    type="text"
                    placeholder="Text input"
                  />{" "}
                  <br></br>
                  <label className=" mt-5" for="timeOpen">
                    Time open:
                  </label>
                  <input
                    id="timeOpen"
                    className="input w-50 mt-5 ml-5"
                    style={{ height: "30px" }}
                    type="text"
                    placeholder="Text input"
                  />{" "}
                  <br></br>
                  <label className=" mt-5" for="timeClose">
                    Time close:
                  </label>
                  <input
                    id="timeClose"
                    className="input w-50 mt-5 ml-5"
                    style={{ height: "30px" }}
                    type="text"
                    placeholder="Text input"
                  />{" "}
                  <br></br>
                  <label className=" mt-5" for="address">
                    Address:
                  </label>
                  <input
                    id="address"
                    className="input w-50 mt-5 ml-5"
                    style={{ height: "30px" }}
                    type="text"
                    placeholder="Text input"
                  />{" "}
                  <br></br>
                  <label className=" mt-5" for="email">
                    Email:
                  </label>
                  <input
                    id="email"
                    className="input w-50 mt-5 ml-5"
                    style={{ height: "30px" }}
                    type="text"
                    placeholder="Text input"
                  />{" "}
                  <br></br>
                  <label className=" mt-5" for="image">
                    Salon's image:
                  </label>
                  <input
                    id="imgae"
                    className=" ml-5 mt-5"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                  />
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
                    value="Confirm"
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
