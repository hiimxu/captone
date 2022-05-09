import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SalonList from "./SalonList.json";
import { styled } from "@mui/system";
import {
  Box,
  Button as MuiButton,
  Dialog,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import paperbg from "../../assets/paperbg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import patterbg from "../../assets/patterbg.svg";
import imageUnavailable from "../../assets/image-unavailable.png";
import { useDispatch, useSelector } from "react-redux";
import { activeSalon, rejectSalon } from "../../redux/actions/creators/admin";

const root = {
  backgroundImage: `url(${bgImg})`,
  backgroundRepeat: "repeat-y",
  backgroundSize: "100%",
};
const FieldLabel = styled(Box)({
  display: "flex",
  color: "#305470",
  fontSize: 30,
  fontFamily: "Segoe UI",
  alignItems: "center",
  justifyContent: "flex-end",
});
const FormWrapper = styled(Box)({
  minWidth: 800,
  backgroundColor: "#f8e0be",
  padding: 30,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
const ButtonWrapper = styled(Box)({
  backgroundColor: "#f8e0be",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "2rem",
  paddingBottom: "1rem",
});
const ErrorText = styled(Typography)({
  color: "#ED4337",
  fontSize: 16,
  fontFamily: "Segoe UI",
  lineHeight: 1.75,
});

const SuccessText = styled(Typography)({
  color: "#4F8A10",
  fontSize: 16,
  fontFamily: "Segoe UI",
  lineHeight: 1.75,
});

export default function ManageService() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //LOAD DATA FROM REDUX
  const { salonPendingRequest } = useSelector(
    (state) => state.salonBusinessInfo
  );
  const { rejectSuccessMess} = useSelector(
    (state) => state.rejectSalon
  );
  const { activeSuccessMess } = useSelector((state) => state.activeSalon);
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );

  //DIALOG ACTIVE
  const [dialogActiveOpen, setDialogActiveOpen] = useState(false);
  const handleActiveClose = () => {
    setDialogActiveOpen(false);
  };

  useEffect(() => {
    if (!salonPendingRequest) {
      navigate("/");
      return;
    }
  }, [salonPendingRequest]);

  //DIALOG REJECT
  const [dialogRejectOpen, setDialogRejectOpen] = useState(false);
  const handleRejectClose = () => {
    setDialogRejectOpen(false);
  };

  //ACTIVE SALON
  const handleActive = () => {
    if (!salonPendingRequest) return;
    const callback = () => {
      setDialogActiveOpen(false);
      navigate("/");
    };
    dispatch(
      activeSalon(token, { salonId: salonPendingRequest.salonId }, callback)
    );
  };

  //REJECT SALON
  const handleReject = () => {
    if (!salonPendingRequest) return;
    const callback = () => {
      setDialogRejectOpen(false);
      navigate("/");
    };
    dispatch(
      rejectSalon(token, { salonId: salonPendingRequest.salonId }, callback)
    );
  };

  return salonPendingRequest ? (
    <div style={root}>
      <div className="columns">
        <div className="column is-2"></div>{" "}
        <div
          className="column is-8 p-0 mt-5 mb-5"
          style={{ backgroundImage: "url(" + paperbg + ")" }}
        >
          <div>
            <div className="columns mt-0 pt-0">
              <div
                className="column is-6"
                style={{ paddingTop: "0px", maxHeight: "40rem" }}
              >
                <img
                  style={{ maxHeight: "40rem", width: "100%" }}
                  src={salonPendingRequest.image}
                  alt="..."
                />
              </div>
              <div className="column is-6 pt-5">
                <div className="pb-2 mb-3">
                  <h2
                    style={{ color: "#134068" }}
                    className="is-size-1 has-text-weight-semibold"
                  >
                    {salonPendingRequest.nameSalon}
                  </h2>
                  <p className="is-size-5 font-weight-bold">
                    Open:{" "}
                    <span className="text-danger">
                      Mon-Sun {salonPendingRequest.timeOpen} -{" "}
                      {salonPendingRequest.timeClose}
                    </span>
                  </p>
                  <p>
                    <span className="is-size-5 font-weight-bold">
                      Phone number:{" "}
                    </span>
                    <span
                      className="is-size-5 is-underlined"
                      style={{ color: "#134068" }}
                    >
                      {salonPendingRequest.phone}
                    </span>
                  </p>
                  <p>
                    <i className="fa-solid fa-location-dot text-secondary"></i>{" "}
                    <span
                      className="is-size-5 font-weight-bold"
                      style={{ color: "#134068" }}
                    >
                      {salonPendingRequest.detailAddress}
                    </span>
                  </p>
                  <p>{salonPendingRequest.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="has-text-centered">
            <div
              style={{
                background: "url(" + paperbg + ")",
                // backgroundColor :"#f5f4eb",
                padding: 0,
                marginTop: "30px",
                marginBottom: "30px",
              }}
            >
              <h1 className="is-size-1 mt-5 mb-5">
                Salon Business Information
              </h1>
              <div className="columns">
                <div className="column is-6 has-text-right">
                  <p className="is-size-4">Salon Id : </p>
                  <p className="is-size-4">Salon owner : </p>
                  <p className="is-size-4">Tax code : </p>
                  <p className="is-size-4">Phone number : </p>
                  <p className="is-size-4">Time open : </p>
                  <p className="is-size-4">Time close : </p>
                  <p className="is-size-4">District : </p>
                  <p className="is-size-4">City : </p>
                  <p className="is-size-4">Email : </p>
                </div>
                <div className="column is-6 has-text-left">
                  <p className="is-size-4">{salonPendingRequest.salonId}</p>
                  <p className="is-size-4"> {salonPendingRequest.nameOwner}</p>
                  <p className="is-size-4 has-text-primary has-text-weight-bold">
                    {salonPendingRequest.taxCode}
                  </p>
                  <p className="is-size-4">{salonPendingRequest.phone}</p>
                  <p className="is-size-4 has-text-danger">
                    {salonPendingRequest.timeOpen}
                  </p>
                  <p className="is-size-4 has-text-danger">
                    {salonPendingRequest.timeClose}
                  </p>
                  <p className="is-size-4">{salonPendingRequest.district}</p>
                  <p className="is-size-4">{salonPendingRequest.city}</p>
                  <p className="is-size-4 is-underlined">
                    {salonPendingRequest.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="pb-5">
              <Link
                to="/ManageSalon"
                className="button is-info mr-5 is-rounded"
              >
                Back
              </Link>
              <button
                className="button mr-5 is-success has-text-white is-rounded"
                onClick={() => setDialogActiveOpen(true)}
              >
                Active
              </button>
              <button
                className="button is-danger has-text-white is-rounded"
                onClick={() => setDialogRejectOpen(true)}
              >
                Reject
              </button>
              {/* DIALOG ACTIVE */}
              <Dialog
                onClose={handleActiveClose}
                open={dialogActiveOpen}
                maxWidth="lg"
              >
                <FormWrapper style={{ minHeight: "6rem" }}>
                  <FieldLabel>Are you sure active this salon?</FieldLabel>
                </FormWrapper>
                <ButtonWrapper>
                  {activeSuccessMess && (
                    <SuccessText>{activeSuccessMess}</SuccessText>
                  )}
                </ButtonWrapper>
                <ButtonWrapper>
                  <button
                    className="button is-info mr-5 has-text-white is-rounded"
                    onClick={() => setDialogActiveOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    className="button is-success has-text-white is-rounded"
                    onClick={handleActive}
                  >
                    Active
                  </button>
                </ButtonWrapper>
              </Dialog>
              {/* DIALOG Reject */}
              <Dialog
                onClose={handleRejectClose}
                open={dialogRejectOpen}
                maxWidth="lg"
              >
                <FormWrapper style={{ minHeight: "6rem" }}>
                  <FieldLabel>Are you sure reject this salon?</FieldLabel>
                </FormWrapper>
                <ButtonWrapper>
                  {rejectSuccessMess && (
                    <SuccessText>{rejectSuccessMess}</SuccessText>
                  )}
                </ButtonWrapper>
                <ButtonWrapper>
                  <button
                    className="button is-info mr-5 has-text-white is-rounded"
                    onClick={() => setDialogRejectOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    className="button is-danger has-text-white is-rounded"
                    onClick={handleReject}
                  >
                    Reject
                  </button>
                </ButtonWrapper>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
