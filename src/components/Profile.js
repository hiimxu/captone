import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Button as MuiButton,
  Dialog,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import ReservationTable from "./tables/ReservationTable";
import { getCustomerProfile } from "../redux/actions/creators/profile";

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

const Button = styled(MuiButton)(({ width }) => ({
  textTransform: "capitalize",
  fontSize: 16,
  borderRadius: 12,
  lineHeight: "40px",
  width,
  height: 40,
}));

const ActionButton = styled(Button)({
  fontSize: 20,
  backgroundColor: "#1e6296",
});

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
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
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

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.loginAccount.account);
  const { info } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getCustomerProfile(token));
  }, [dispatch, token]);

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <PageWrapper container spacing={2}>
        <Grid item xs={12} md={3}>
          <UserInfo>
            <UsernameText>Username</UsernameText>
            <UserInfoText>Name: Nguyen Van A</UserInfoText>
            <UserInfoText>Gender: male</UserInfoText>
            <UserInfoText>Birthday: 01/01/1999</UserInfoText>
            <UserInfoText>Phone number: 0987654321</UserInfoText>
            <UserInfoText>Location: Nam Tu Liem, Hanoi</UserInfoText>
            <ButtonWrapper>
              <ActionButton
                width={180}
                variant="contained"
                onClick={() => setDialogOpen(true)}
              >
                Edit
              </ActionButton>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button
                width={180}
                variant="outlined"
                // onClick={() => setDialogOpen(true)}
              >
                Change password
              </Button>
            </ButtonWrapper>
          </UserInfo>
        </Grid>
        <Grid item xs={12} md={9}>
          <ReservationHistory>
            <Tabs container>
              <Grid item xs={6}>
                <Tab
                  selected={selectedTab === 0}
                  onClick={() => setSelectedTab(0)}
                >
                  Reservation
                </Tab>
              </Grid>
              <Grid item xs={6}>
                <Tab
                  selected={selectedTab === 1}
                  onClick={() => setSelectedTab(1)}
                >
                  History
                </Tab>
              </Grid>
            </Tabs>
            {selectedTab === 0 && (
              <ReservationTable data={reservationMockData} />
            )}
            {selectedTab === 1 && (
              <ReservationTable historyTable data={historyMockData} />
            )}
          </ReservationHistory>
        </Grid>
      </PageWrapper>
      <Dialog onClose={handleClose} open={dialogOpen} maxWidth="lg">
        <FormWrapper style={{ minHeight: "50vh" }}>
          <FieldWrapper container spacing={2}>
            <Grid item xs={4}>
              <FieldLabel>Name</FieldLabel>
            </Grid>
            <Grid item xs={8}>
              <TextInput variant="standard" margin="dense" size="small" />
            </Grid>
          </FieldWrapper>
          <FieldWrapper container spacing={2}>
            <Grid item xs={4}>
              <FieldLabel>Birthday</FieldLabel>
            </Grid>
            <Grid item xs={8}>
              <DatePicker selected={new Date("2015-03-25T12:00:00-06:30")} />
            </Grid>
          </FieldWrapper>
          <FieldWrapper container spacing={2}>
            <Grid item xs={4}>
              <FieldLabel>Phone number</FieldLabel>
            </Grid>
            <Grid item xs={8}>
              <TextInput variant="standard" margin="dense" size="small" />
            </Grid>
          </FieldWrapper>
          <FieldWrapper container spacing={2}>
            <Grid item xs={4}>
              <FieldLabel>Address</FieldLabel>
            </Grid>
            <Grid item xs={8}>
              <TextInput variant="standard" margin="dense" size="small" />
            </Grid>
          </FieldWrapper>
          <ButtonWrapper>
            <SecondaryActionButton
              variant="contained"
              color="error"
              width={110}
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </SecondaryActionButton>
            <ActionButton variant="contained" width={110}>
              Done
            </ActionButton>
          </ButtonWrapper>
        </FormWrapper>
      </Dialog>
    </>
  );
}
