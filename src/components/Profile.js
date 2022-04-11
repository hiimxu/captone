import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
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
import {
  getCustomerProfile,
  updateCustomerProfile,
} from "../redux/actions/creators/profile";
import { getHistoryBooking } from "../redux/actions/creators/booking";
import { convertISOStringToLocaleDateString } from "../utils";
import { validPhone } from "../validations/regex";

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
  const [profileInfo, setProfileInfo] = useState(null);
  const [validationErr, setValidationErr] = useState(null);

  const dispatch = useDispatch();
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );
  const { info, errMess, successMess } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getCustomerProfile(token));
  }, [dispatch, token, dialogOpen]);

  useEffect(() => {
    dispatch(getHistoryBooking(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (info) {
      setProfileInfo(info);
    }
  }, [info]);

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <PageWrapper container spacing={2}>
        <Grid item xs={12} md={3}>
          <UserInfo>
            {info ? (
              <>
                <UsernameText>{username}</UsernameText>
                <UserInfoText>
                  <b>Name:</b> {info?.nameCustomer}
                </UserInfoText>
                <UserInfoText>
                  <b>Birthday:</b>{" "}
                  {convertISOStringToLocaleDateString(info?.birthday)}
                </UserInfoText>
                <UserInfoText>
                  <b>Phone number:</b> {info?.phone}
                </UserInfoText>
                <UserInfoText>
                  <b>Address:</b> {info?.address}
                </UserInfoText>
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
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </Box>
            )}
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
              <TextInput
                variant="standard"
                margin="dense"
                size="small"
                value={profileInfo?.nameCustomer}
                onChange={(e) => {
                  setProfileInfo({
                    ...profileInfo,
                    nameCustomer: e.target.value,
                  });
                }}
              />
            </Grid>
          </FieldWrapper>
          <FieldWrapper container spacing={2}>
            <Grid item xs={4}>
              <FieldLabel>Birthday</FieldLabel>
            </Grid>
            <Grid item xs={8}>
              <DatePicker
                selected={new Date(profileInfo?.birthday)}
                onChange={(date) => {
                  const dateStr = date.toISOString();
                  setProfileInfo({ ...profileInfo, birthday: dateStr });
                }}
              />
            </Grid>
          </FieldWrapper>
          <FieldWrapper container spacing={2}>
            <Grid item xs={4}>
              <FieldLabel>Phone number</FieldLabel>
            </Grid>
            <Grid item xs={8}>
              <TextInput
                variant="standard"
                margin="dense"
                size="small"
                inputProps={{ maxLength: 10 }}
                value={profileInfo?.phone}
                onChange={(e) => {
                  setProfileInfo({
                    ...profileInfo,
                    phone: e.target.value,
                  });
                }}
              />
            </Grid>
          </FieldWrapper>
          <FieldWrapper container spacing={2}>
            <Grid item xs={4}>
              <FieldLabel>Address</FieldLabel>
            </Grid>
            <Grid item xs={8}>
              <TextInput
                variant="standard"
                margin="dense"
                size="small"
                value={profileInfo?.address}
                onChange={(e) => {
                  setProfileInfo({
                    ...profileInfo,
                    address: e.target.value,
                  });
                }}
              />
            </Grid>
          </FieldWrapper>
          <ButtonWrapper>
            {successMess && <SuccessText>{successMess}</SuccessText>}
            {errMess && <ErrorText>{errMess}</ErrorText>}
            {validationErr && <ErrorText>{validationErr}</ErrorText>}
          </ButtonWrapper>
          <ButtonWrapper>
            <SecondaryActionButton
              variant="contained"
              color="error"
              width={110}
              onClick={() => {
                setDialogOpen(false);
                setProfileInfo(info);
              }}
            >
              Cancel
            </SecondaryActionButton>
            <ActionButton
              variant="contained"
              width={110}
              onClick={() => {
                const { nameCustomer, phone, address, birthday } = profileInfo;
                if (!nameCustomer || !phone || !address || !birthday) {
                  setValidationErr("Please enter all the fields");
                  return;
                }
                if (!validPhone.test(phone)) {
                  setValidationErr("Phone number is invalid!");
                  return;
                }
                setValidationErr(null);
                const submitObject = {
                  nameCustomer,
                  phone,
                  address,
                  birthday: birthday.substring(0, 10),
                };
                const callback = () => {
                  setDialogOpen(false);
                };
                dispatch(updateCustomerProfile(submitObject, token, callback));
              }}
            >
              Done
            </ActionButton>
          </ButtonWrapper>
        </FormWrapper>
      </Dialog>
    </>
  );
}
