import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { currencyFormatter } from "../utils";
import moment from "moment";
import { resetBookingDetails } from "../redux/actions/creators/booking";

const root = {
  backgroundColor: "#CFC787",
};
const info = {
  marginLeft: "20%",
};

const message = "Your booking is completed";
export default function FinishBooking() {
  const { bookingDetails } = useSelector((state) => state.booking);
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(resetBookingDetails());
    };
  }, [dispatch]);

  return bookingDetails ? (
    <div className="" style={root}>
      <div className="container row pt-5 pb-5" style={info}>
        <div className="col-md-5 pt-5 pb-5  rounded-left" style={{ borderRight: "none", backgroundColor: "#FBE8CA" }}>
          <div className="card-body">
            <h2 className="font-weight-bold" style={{ color: "#134068" }}>
              {bookingDetails.nameSalon}
            </h2>
            <p className="font-weight-bold">
              Open:{" "}
              <span className="text-danger">
                Mon-Sun {bookingDetails.timeOpen}-{bookingDetails.timeClose}
              </span>
            </p>
            <p>
              <span className="font-weight-bold">Phone: </span> {bookingDetails.phoneSalon}
            </p>
            <p style={{ borderBottom: " 1px solid rgba(0, 0, 0, 0.3)" }}>
              <i className="fa-solid fa-location-dot text-secondary"></i> <span>{bookingDetails.detailAddress}</span>
            </p>
            <h5 className="font-weight-bold" style={{ color: "#134068", borderBottom: " 1px solid rgba(0, 0, 0, 0.3)" }}>
              {bookingDetails.nameService}
            </h5>
            <p style={{ borderBottom: " 1px solid rgba(0, 0, 0, 0.3)" }}>
              {bookingDetails.service_time} minutes
              <span className="font-weight-bold text-danger"> . {currencyFormatter.format(bookingDetails.price_original)}</span>
            </p>
            <p style={{ borderBottom: " 1px solid rgba(0, 0, 0, 0.3)" }}>
              <span className="font-weight-bold"> Schedule at: </span>
              <span>{moment(bookingDetails.timeUse).format("DD/MM/YYYY - HH:mm")}</span>
            </p>
            <p style={{ borderBottom: " 1px solid rgba(0, 0, 0, 0.3)" }}>
              <span className="font-weight-bold">Stylist: </span>
              {bookingDetails.nameStaff}
            </p>
          </div>
        </div>
        <div className="col-md-7  pt-5 rounded-right" style={{ borderLeft: "none", backgroundColor: "#FFDCA6" }}>
          <div className="card-body text-center">
            <h1 className="text-success display-2">
              <i className="fa-solid fa-circle-check"></i>
            </h1>
            <h2 className="font-weight-bold text-success">{message}</h2>
            <p>
              Thanks <span className="font-weight-bold">{bookingDetails.nameCustomer}</span> for using our service!
            </p>
            <Link to="/">
              <p className="text-secondary font-weight-bold">
                <u>Return to homepage</u>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
