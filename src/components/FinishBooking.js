import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { currencyFormatter } from "../utils";
import moment from "moment";
import { resetBookingDetails } from "../redux/actions/creators/booking";

import introbg from "../assets/introbg-1.jpg";
import paperbg from "../assets/paperbg.jpg";
import patterbg from "../assets/patterbg.svg";



const message = "Your booking is completed";
export default function FinishBooking() {
  const { bookingDetails } = useSelector((state) => state.booking);
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(resetBookingDetails());
    };
  }, [dispatch]);

  // -- CSS --
  const root = {
    backgroundImage: `url(${introbg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
  };
  const rightReceipt = {
    height: 400 + "px",
    background: `url(${patterbg})`,
    // borderRadius: "0 25px 25px 0",
  };
  const leftReceipt = {
    minHeight: 400 + "px",
    // borderRadius: "25px 0 0 25px",
    background: "url(" + paperbg + ")",
    borderRight: "1px solid gray",
  };

  return bookingDetails ? (
    <div style={root}>
    <div className="columns">
      <div className="column is-2"></div>
      <div className="column is-8">
        {/* -- FINISH CARD -- */}
        <div
          className="columns mt-5 mb-5"
          style={{ boxShadow: "1px 1px 20px black"}}
        >
          {/* -- RIGHT CARD -- */}
          <div className="column is-4 " style={leftReceipt}>
            <h2
              className="font-weight-bold is-size-2"
              style={{ color: "#134068" }}
            >
              {bookingDetails.nameSalon}
            </h2>
            <p className="font-weight-bold  is-size-5">
              Open:{" "}
              <span className="text-danger">
                Mon-Sun {bookingDetails.timeOpen}-{bookingDetails.timeClose}
              </span>
            </p>
            <p className=" is-size-5">
              <span className="font-weight-bold">Phone: </span>{" "}
              {bookingDetails.phoneSalon}
            </p>
            <p className="is-size-5">
              <i class="fa-solid fa-location-dot text-secondary"></i>{" "}
              <span>{bookingDetails.detailAddress}</span>
            </p>
            <hr
              class="solid"
              style={{
                marginTop: 5,
                marginBottom: 5,
                borderTop: 1 + "px solid grey",
                opacity: 40 + "%",
              }}
            />
            <h5 className="font-weight-bold is-size-4">
              {bookingDetails.nameService}
            </h5>
            <p className="is-size-5">
              {bookingDetails.service_time} minutes{" "}
              <span className="font-weight-bold text-danger is-size-5">
                - {currencyFormatter.format(bookingDetails.price_original)}
              </span>
            </p>
            <hr
              class="solid"
              style={{
                marginTop: 5,
                marginBottom: 5,
                borderTop: 1 + "px solid grey",
                opacity: 40 + "%",
              }}
            />
            <p className="is-size-5">
              <span className="font-weight-bold"> Schedule at: </span>
              <span>
              {moment(bookingDetails.timeUse).format("DD/MM/YYYY - HH:mm")}
              </span>
            </p>
            <hr
              class="solid"
              style={{
                marginTop: 5,
                marginBottom: 5,
                borderTop: 1 + "px solid grey",
                opacity: 40 + "%",
              }}
            />
            <p className="is-size-5">
              <span className="font-weight-bold">Stylist: </span>
              {bookingDetails.nameStaff}
            </p>
            <hr
              class="solid"
              style={{
                marginTop: 5,
                marginBottom: 5,
                borderTop: 1 + "px solid grey",
                opacity: 40 + "%",
              }}
            />
            <p className="is-size-4">
              <span className="font-weight-bold">Payment method: </span>
            </p>
            <p className="is-size-5">Cash</p>
          </div>

          {/* -- LEFT CARD -- */}
          <div className="column is-8" style={rightReceipt}>
            <div className="card-body text-center">
              <h1 className="text-success display-2">
                <i class="fa-solid fa-circle-check"></i>
              </h1>
              <h2 className="font-weight-bold text-success is-size-3">
                {message}
              </h2>
              <p className="is-size-4">
                Thanks{" "}
                <span className="font-weight-bold">
                  {bookingDetails.nameCustomer}
                </span>{" "}
                for using our service!
              </p>
              <Link to="/">
                <p className="font-weight-bold has-text-link is-size-5">
                  <u>Return to homepage</u>
                </p>
              </Link>
            </div>
          </div>
        </div>
        {/* -- FINISH CARD -- */}
      </div>

      <div className="column is-2"></div>
    </div>
  </div>
  ) : (
    <></>
  );
}
