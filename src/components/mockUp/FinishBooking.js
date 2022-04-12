import React from "react";
import { Link } from "react-router-dom";
import {
  currencyFormatter,
  convertISOStringToLocaleDateString,
} from "../../utils";
import bgImg from "../../assets/barbershopbg.jpg";
import introbg from "../../assets/introbg-1.jpg";
import { height } from "@mui/system";

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
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
  };
  const rightReceipt = { height: 400 + "px", background: `url(${introbg})` ,border:"1px solid grey",borderRadius : "0 25px 25px 0"};
  const info = {
    marginLeft: "20%",
  };

  return (
    <div style={root}>
      <div className="columns">
        <div className="column is-2"></div>
        <div
          className="column is-3  mt-5 mb-5"
          style={{
            minHeight: 400 + "px",
            border:"1px solid grey",
            borderRadius : "25px 0 0 25px",
            background:
              "url(https://media.istockphoto.com/photos/brown-recycled-paper-crumpled-texture-background-cream-old-vintage-picture-id1278709873?k=20&m=1278709873&s=612x612&w=0&h=1vFDb3aFhBeBOSHjgGHGDQVHIgnJFPqIjXcwp4AShGw=)",
          }}
        >
          <h2
            className="font-weight-bold is-size-2"
            style={{ color: "#134068" }}
          >
            {dataBooking.salonName}
          </h2>
          <p className="font-weight-bold  is-size-5">
            Open:{" "}
            <span className="text-danger">
              Mon-Sun {dataBooking.timeOpen}-{dataBooking.timeClose}
            </span>
          </p>
          <p className=" is-size-5">
            <span className="font-weight-bold">Phone: </span>{" "}
            {dataBooking.phoneSalon}
          </p>
          <p className="is-size-5">
            <i class="fa-solid fa-location-dot text-secondary"></i>{" "}
            <span>{dataBooking.salonAddress}</span>
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
            {dataBooking.serviceName}
          </h5>
          <p className="is-size-5">
            {dataBooking.serviceTime} minutes{" "}
            <span className="font-weight-bold text-danger is-size-5">
              - {currencyFormatter.format(dataBooking.price)}
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
              {convertISOStringToLocaleDateString(dataBooking.dateBooking)}{" "}
              {"- "}
            </span>
            <span>{dataBooking.timeBooking}</span>
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
            {dataBooking.staffName}
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
        <div className="column is-5 mt-5 mb-5" style={rightReceipt}>
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
                {dataBooking.customerName}
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
        <div className="column is-2"></div>
      </div>
    </div>
  );
}
