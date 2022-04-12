import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getScheduleCurrent,
  resetScheduleCurentList,
} from "../../redux/actions/creators/salon";
import { convertISOStringToLocaleDateString } from "../../utils";

const mockData = [
  {
    registerServiceID: 94,
    serviceID: 1,
    salonID: 1,
    timeUse: "2022-04-04 12:00:00",
    price_original: "100",
    nameStatus: "booked",
    nameStaff: "staff",
    staffId: 1,
    nameSalon: "duy salon",
    nameService: "combo1",
    image: "",
    service_time: "45",
    nameCustomer: "duy",
    phone: "0912345678",
  },
  {
    registerServiceID: 92,
    serviceID: 1,
    salonID: 1,
    timeUse: "2022-04-04 12:00:00",
    price_original: "100",
    nameStatus: "booked",
    nameStaff: "staff",
    staffId: 1,
    nameSalon: "duy salon",
    nameService: "combo1",
    image: "",
    service_time: "45",
    nameCustomer: "duy",
    phone: "0912345678",
  },
  {
    registerServiceID: 99,
    serviceID: 1,
    salonID: 1,
    timeUse: "2022-04-04 12:00:00",
    price_original: "100",
    nameStatus: "booked",
    nameStaff: "staff",
    staffId: 1,
    nameSalon: "duy salon",
    nameService: "combo1",
    image: "",
    service_time: "45",
    nameCustomer: "duy",
    phone: "0912345678",
  },
];

export default function Schedule() {
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [dateFormated, setDateFormated] = useState({ day: convertDate(date) });

  const dispatch = useDispatch();
  const { currentSchedule, errMess } = useSelector(
    (state) => state.scheduleCurent
  );
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );

  useEffect(() => {
    dispatch(getScheduleCurrent(token, dateFormated));
    return () => {
      dispatch(resetScheduleCurentList());
    };
  }, [dispatch, token, dateFormated]);

  const handleFinish = (e) => {
    e.preventDefault();
    console.log("finish");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    console.log("cancel");
  };

  const handleSelectDate = (e) => {
    setDate(e.target.value);
    setDateFormated({ day: convertDate(e.target.value) });
    console.log(date);
  };
  function convertDate(date) {
    var newdate = new Date(date),
      mnth = ("0" + (newdate.getMonth() + 1)).slice(-2),
      day = ("0" + newdate.getDate()).slice(-2);
    return [newdate.getFullYear(), mnth, day].join("-");
  }
  return (
    <div className="m-0 p-5" style={{ backgroundColor: "#CFC787" }}>
      <div className="mb-3">
        <input
          className="rounded"
          type="date"
          value={date}
          onChange={handleSelectDate}
        ></input>
      </div>
      <div className="bg-white rounded">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Service</th>
              <th scope="col">Customer</th>
              <th scope="col">Time</th>
              <th scope="col">Stylist</th>
              <th scope="col">Status</th>
              <th scope="col">Finish</th>
              <th scope="col">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {currentSchedule?.map((data) => (
              <tr key={data.registerServiceID}>
                <th scope="row">{currentSchedule.indexOf(data) + 1}</th>
                <td>{data.nameService}</td>
                <td>{data.nameCustomer}</td>
                {/* <td>{data.timeUse.split(" ")[1].slice(0, -3)}</td> */}
                <td>{convertISOStringToLocaleDateString(data.timeUse)}</td>
                <td>{data.nameStaff}</td>
                <td className="font-weight-bold" style={{color:"#ebae46", fontSize:"1.15rem"}}>{data.nameStatus}</td>
                <td>
                  <button
                    className="border-0 bg-white"
                    onClick={handleFinish}
                    style={{ fontSize: "1.25rem" }}
                  >
                    <i className="fa-solid fa-circle-check text-success"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="border-0 bg-white"
                    onClick={handleCancel}
                    style={{ fontSize: "1.25rem" }}
                  >
                    <i className="fa-solid fa-trash-can text-danger"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
