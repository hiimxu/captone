import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { styled } from "@mui/system";
import {
  Box,
  Button as MuiButton,
  Dialog,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import bgImg from "../../assets/barbershopbg.jpg";
import paperbg from "../../assets/paperbg.jpg";
import { activeSalon } from "../../redux/actions/creators/admin";

//CSS
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

export default function DetailSalonDeactive() {
  const navigate = useNavigate();
  const dispatch =useDispatch()

  //LOAD DATA FROM REDUX
  const { salonDeactivated } = useSelector((state) => state.salonBusinessInfo);
  const { activeSuccessMess, errMess } = useSelector((state) => state.activeSalon);
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );

  useEffect(() => {
    if (!salonDeactivated) {
      navigate("/");
      return;
    }
  }, [salonDeactivated]);

  //DIALOG
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClose = () => {
    setDialogOpen(false);
  };

  //ACTIVE SALON
  const handleActive=()=>{
    if (!salonDeactivated) return;
    const callback = () => {
      setDialogOpen(false);
      navigate("/");
    };
    dispatch(activeSalon(token,{salonId: salonDeactivated.salonId},callback))
  }

  return salonDeactivated ? (
    <div style={root}>
      <div className="columns">
        <div className="column is-2"></div>{" "}
        <div
          className="column is-8 p-0 mt-5 mb-5"
          style={{ backgroundImage: "url(" + paperbg + ")" }}
        >
          <div>
            <div className="columns mt-0 pt-0">
              <div className="column is-6" style={{ paddingTop: "0px" }}>
                <img
                  style={{ height: "100%", width: "auto" }}
                  src={salonDeactivated.image}
                  alt="..."
                />
              </div>
              <div className="column is-6 pt-5">
                <div className="pb-2 mb-3">
                  <h2
                    style={{ color: "#134068" }}
                    className="is-size-1 has-text-weight-semibold"
                  >
                    {salonDeactivated.nameSalon}
                  </h2>
                  <p className="is-size-5 font-weight-bold">
                    Open:{" "}
                    <span className="text-danger">
                      Mon-Sun {salonDeactivated.timeOpen.slice(0, -3)} -{" "}
                      {salonDeactivated.timeClose.slice(0, -3)}
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
                      {salonDeactivated.phone}
                    </span>
                  </p>
                  <p>
                    <i className="fa-solid fa-location-dot text-secondary"></i>{" "}
                    <span
                      className="is-size-5 font-weight-bold"
                      style={{ color: "#134068" }}
                    >
                      {salonDeactivated.detailAddress}
                    </span>
                  </p>
                  <p>{salonDeactivated.description}</p>
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
                  <p className="is-size-4">{salonDeactivated.salonId}</p>
                  <p className="is-size-4"> {salonDeactivated.nameOwner}</p>
                  <p className="is-size-4 has-text-primary has-text-weight-bold">
                    {salonDeactivated.taxCode}
                  </p>
                  <p className="is-size-4">{salonDeactivated.phone}</p>
                  <p className="is-size-4 has-text-danger">
                    {salonDeactivated.timeOpen}
                  </p>
                  <p className="is-size-4 has-text-danger">
                    {salonDeactivated.timeClose}
                  </p>
                  <p className="is-size-4">{salonDeactivated.district}</p>
                  <p className="is-size-4">{salonDeactivated.city}</p>
                  <p className="is-size-4 is-underlined">
                    {salonDeactivated.email}
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
              <button className="button is-success has-text-white is-rounded"
              onClick={()=>{
                setDialogOpen(true)
              }}>
                Active
              </button>
            </div>
            <Dialog onClose={handleClose} open={dialogOpen} maxWidth="lg">
              <FormWrapper style={{ minHeight: "6rem" }}>
                <FieldLabel>Are you sure activate this salon?</FieldLabel>
              </FormWrapper>
              <ButtonWrapper>
                {activeSuccessMess && <SuccessText>{activeSuccessMess}</SuccessText>}
                {errMess && <ErrorText>{errMess}</ErrorText>}
              </ButtonWrapper>
              <ButtonWrapper>
                <button
                  className="button is-info mr-5 has-text-white is-rounded"
                  onClick={() => setDialogOpen(false)}
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
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
