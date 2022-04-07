import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  getStaffList,
  resetStaffList,
  updateSelectedStaffId,
  getServiceList,
  resetServiceList,
} from "../redux/actions/creators/booking";

const slots = [3, 4, 5, 7, 8, 12, 13, 14, 18, 19, 22, 23, 24, 25, 26, 27, 30];
const timeOpen = "8:30";
const timeClose = "20:00";

export default function Staff() {
  const [date, setDate] = useState(new Date());
  const [staff, setStaff] = useState("");
  const [time, setTime] = useState("");

  const { serviceId } = useParams();
  const dispatch = useDispatch();

  const { staffList } = useSelector((state) => state.staff);
  const { serviceList } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(getServiceList(serviceId));

    return () => {
      dispatch(resetServiceList());
    };
  }, [dispatch, serviceId]);

  useEffect(() => {
    dispatch(getStaffList(serviceId));

    return () => {
      dispatch(resetStaffList());
    };
  }, [dispatch, serviceId]);

  const handleInputDate = (date) => {
    setDate(date);
  };

  return (
    <div
      className="container p-0"
      style={{ marginLeft: "20%", backgroundColor: "#e0daa4" }}
    >
      <div className="">
        {serviceList?.dataSalon?.map((salon) => (
          <div
            className="mb-4 pt-3 text-center"
            style={{ backgroundColor: "#C3AF91" }}
          >
            <div className="pl-3 pb-2 mb-3">
              <h2 style={{ color: "#134068" }}>{salon.nameSalon}</h2>
              <p className="font-weight-bold">
                Open:{" "}
                <span className="text-danger">
                  Mon-Sun {salon.timeOpen.slice(0, -3)} -{" "}
                  {salon.timeClose.slice(0, -3)}
                </span>
              </p>
              <p>
                <span className="font-weight-bold">Phone number: </span>
                <span className="text" style={{ color: "#134068" }}>
                  {salon.phone}
                </span>
              </p>
              <p>
                <i class="fa-solid fa-location-dot text-secondary"></i>{" "}
                <span className="font-weight-bold" style={{ color: "#134068" }}>
                  {salon.detailAddress}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className=" row g-0 p-5">
        <div className="col-md-6">
          <select
            className="form-select form-select-lg mb-3"
            value={staff}
            onChange={(e) => setStaff(e.target.value)}
            style={{ width: "17rem", height: "2.5rem" }}
          >
            <option defaultValue={""}>Choose a staff...</option>
            {staffList?.map((staff) => (
              <option key={staff.staffId} value={staff.staffId}>
                {staff.name}
              </option>

              // <Link
              //       to="/"
              //       className="btn btn-primary"
              //       onClick={() => {
              //         dispatch(updateSelectedStaffId(staff.staffId));
              //       }}
              //     >
              //       Book now
              //     </Link>
            ))}
          </select>
          <div className="form-check pl-0">
            {slots.map((slot) => (
              <div
                className="form-check form-check-inline"
                key={slot.toString()}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <input
                  type="radio"
                  name="inlineRadioOptions"
                  value={slot}
                  className="rounded mr-2 mb-2 bg-white"
                ></input>
                <label>{slot}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6 pl-5">
          <Calendar
            className="rounded"
            onChange={handleInputDate}
            value={date}
          />
          {console.log({ date: date, staffId: staff, timeBooking: time })}
        </div>
      </div>
      <div className="col-md-12 text-center pb-5 ">
        <Link className="btn btn-primary" to="/finish_booking">
          Submit
        </Link>
      </div>
    </div>
  );
}
