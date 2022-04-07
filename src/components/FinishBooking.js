import React from "react";
import { Link } from "react-router-dom";
import { currencyFormatter,convertISOStringToLocaleDateString } from "../utils";

const dataBooking = {
  salonName: "D'BarBer",
  salonAddress: "22A, Dai Tu, Hoang Mai, Hanoi",
  phoneSalon: "0912345678",
  timeOpen: "8:30",
  timeClose: "20:00",
  dateBooking: "2022/4/10",
  timeBooking: "9:00",
  serviceName: "Basic Cut",
  price: "150000",
  staffName: "Pham Duc",
  serviceTime: "60",

  customerName: "Nguyen Van A",
  phone: "0917451496",
};


const message = "Your booking is completed";
export default function FinishBooking() {
  const root = {
    backgroundColor: "#CFC787",
  };
  const info = {
    marginLeft: "20%",
  };

  return (
    <div className="" style={root}>
      <div className="container row pt-5 pb-5" style={info}>
        <div
          className="col-md-5 pt-5 pb-5  rounded-left"
          style={{ borderRight: "none", backgroundColor: "#FBE8CA" }}
        >
          <div className="card-body">
            <h2 className="font-weight-bold" style={{ color: "#134068" }}>
              {dataBooking.salonName}
            </h2>
            <p className="font-weight-bold">
              Open:{" "}
              <span className="text-danger">
                Mon-Sun {dataBooking.timeOpen}-{dataBooking.timeClose}
              </span>
            </p>
            <p>
              <span className="font-weight-bold">Phone: </span>{" "}
              {dataBooking.phoneSalon}
            </p>
            <p style={{borderBottom:" 1px solid rgba(0, 0, 0, 0.3)"}}>
              <i class="fa-solid fa-location-dot text-secondary"></i>{" "}
              <span>{dataBooking.salonAddress}</span>
            </p>
            <h5
              className="font-weight-bold"
              style={{ color: "#134068",borderBottom:" 1px solid rgba(0, 0, 0, 0.3)"}}
            >
              {dataBooking.serviceName}
            </h5>
            <p style={{borderBottom:" 1px solid rgba(0, 0, 0, 0.3)"}}>
              {dataBooking.serviceTime} minutes
              <span className="font-weight-bold text-danger"> . {currencyFormatter.format(dataBooking.price)}</span>
            </p>
            <p style={{borderBottom:" 1px solid rgba(0, 0, 0, 0.3)"}}>
              <span className="font-weight-bold"> Schedule at: </span>
              <span>{convertISOStringToLocaleDateString(dataBooking.dateBooking)} {"- "}</span>
              <span>{dataBooking.timeBooking}</span>
            </p>
            <p style={{borderBottom:" 1px solid rgba(0, 0, 0, 0.3)"}}>
              <span className="font-weight-bold">Stylist: </span>
              {dataBooking.staffName}
            </p>
          </div>
        </div>
        <div
          className="col-md-7  pt-5 rounded-right"
          style={{ borderLeft: "none", backgroundColor: "#FFDCA6" }}
        >
          <div className="card-body text-center">
            <h1 className="text-success display-2">
              <i class="fa-solid fa-circle-check"></i>
            </h1>
            <h2 className="font-weight-bold text-success">{message}</h2>
            <p>
              Thanks{" "}
              <span className="font-weight-bold">
                {dataBooking.customerName}
              </span>{" "}
              for using our service!
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
  );
}
