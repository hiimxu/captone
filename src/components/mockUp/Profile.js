import React, { useState } from "react";
import { minHeight, styled } from "@mui/system";
import {
  Box,
  Button,
  Dialog,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ReservationTable from "../tables/ReservationTable";
import bgImg from "../../assets/barbershopbg.jpg";
import introbg from "../../assets/introbg-1.jpg";
import paperbg from "../../assets/paperbg.jpg";


const root = {
  backgroundImage: `url(${bgImg})`,
  backgroundRepeat: "repeat-y",
  backgroundSize: "100%",
};
const PageWrapper = styled(Grid)({
  backgroundColor: "#cfc787",
  minHeight: "100vh",
  padding: 40,
});

const UserInfo = styled(Box)({
  padding: 20,
  backgroundColor: "#ffdca6",
  display: "flex",
  flexDirection: "column",
  minHeight: 550,
});

const UserInfoText = styled(Typography)({
  color: "#305470",
  fontSize: 20,
  fontFamily: "Segoe UI",
  lineHeight: 1.75,
});

const UsernameText = styled(UserInfoText)({
  fontSize: 36,
  fontWeight: 600,
});

const ButtonWrapper = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 20,
});

const ActionButton = styled(Button)(({ width }) => ({
  backgroundColor: "#1e6296",
  textTransform: "capitalize",
  fontSize: 20,
  borderRadius: 12,
  lineHeight: "40px",
  width,
  height: 40,
}));

const SecondaryActionButton = styled(ActionButton)({
  backgroundColor: "#ff6060",
  marginRight: 30,
});

const ReservationHistory = styled(Box)({
  backgroundColor: "#ffdca6",
  display: "flex",
  flexDirection: "column",
  minHeight: 550,
});

const Tabs = styled(Grid)({
  height: 70,
});

const Tab = styled(Box)(({ selected }) => ({
  backgroundColor: selected ? "#ffdca6" : "#dfc8a5",
  display: "flex",
  color: "#305470",
  fontSize: 28,
  fontFamily: "Segoe UI",
  lineHeight: 1.75,
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));

const FormWrapper = styled(Box)({
  minWidth: 800,
  backgroundColor: "#f8e0be",
  padding: 30,
});

const FieldWrapper = styled(Grid)({
  height: 60,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const FieldLabel = styled(Box)({
  display: "flex",
  color: "#305470",
  fontSize: 20,
  fontFamily: "Segoe UI",
  alignItems: "center",
  justifyContent: "flex-end",
});

const TextInput = styled(TextField)({
  height: 30,
  width: 300,
});

const reservationMockData = [
  {
    id: 1,
    serviceName: "Undercut",
    price: 120000,
    timeUse: "30-40 minutes",
    timeRegister: "2022-03-05T14:48:00.000Z",
    status: "Booked",
    staffName: "Nguyen Van A",
  },
];

const historyMockData = [
  {
    id: 1,
    serviceName: "Undercut",
    price: 120000,
    timeUse: "30-40 minutes",
    timeRegister: "2022-03-25T14:48:00.000Z",
    status: "Finish",
    staffName: "Nguyen Van A",
  },
  {
    id: 2,
    serviceName: "Undercut",
    price: 120000,
    timeUse: "30-40 minutes",
    timeRegister: "2022-03-15T14:48:00.000Z",
    status: "Finish",
    staffName: "Nguyen Van A",
  },
];

export default function Profile() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div style={root}>
      <div className="columns" style={{ minHeight: "800px" }}>
        <div className="column is-2"></div>
        <div
          className="column is-3"
          style={{
            height: 400 + "px",
            background: `url(${introbg})`,
            border: "1px solid grey",
            marginTop: "30px",
          }}
        >
          <h1>{}</h1>
        </div>
        <div
          className="column is-5"
          style={{
            height: 400 + "px",
            background: `url(${paperbg})`,
            border: "1px solid grey",
            marginTop: "30px",
          }}
        ></div>
        <div className="column is-2"></div>
      </div>
    </div>
  );
}
