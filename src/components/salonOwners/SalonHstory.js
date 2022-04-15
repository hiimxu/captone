import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSalonBookingHistory,
  resetSalonBookingHistoryList,
} from "../../redux/actions/creators/salon";
import {
  convertISOStringToLocaleDateString,
  convertISOStringToLocaleTimeString,
  currencyFormatter,
} from "../../utils";

export default function SalonHstory() {
  
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

  const dispatch = useDispatch();
  const { historyBooking,} = useSelector(
    (state) => state.salonHistory
  );
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );

  useEffect(() => {
    dispatch(getSalonBookingHistory(token,{day:date}));
    return () => {
      dispatch(resetSalonBookingHistoryList());
    };
  }, [dispatch, token,date]);

  const handleSelectDate = (e) => {
    setDate(convertDate(e.target.value));    
    
  };
  function convertDate(date) {
    var newdate = new Date(date),
      mnth = ("0" + (newdate.getMonth() + 1)).slice(-2),
      day = ("0" + newdate.getDate()).slice(-2);
    return [newdate.getFullYear(), mnth, day].join("-");
  }
  return (
    <div className="m-0 p-5" style={{ backgroundColor: "#CFC787" }}>
      <div className="mb-4">
          <input
            className="rounded border-0"
            type="date"
            value={date}
            onChange={handleSelectDate}
            
          />
        </div>
      <div className="bg-white rounded">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Customer</th>
              <th scope="col">Service</th>
              <th scope="col">Price</th>
              <th scope="col">Stylist</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            {historyBooking?.map((data) => (
              <tr key={data.registerServiceID}>
                <th scope="row">{historyBooking?.indexOf(data) + 1}</th>
                <td>
                  <p
                    className="font-weight-bold bg-transparent"
                    style={{ fontSize: "1.2rem", color: "#1E6296" }}
                  >
                    {data.nameCustomer}
                  </p>
                  {data.phone ? data.phone : "Salon booked"}
                </td>
                <td>
                  <p
                    className="font-weight-bold bg-transparent"
                    style={{ fontSize: "1.2rem", color: "#1E6296" }}
                  >
                    {data.nameService}
                  </p>
                  <p>{data.service_time} minutes</p>
                </td>
                <td className="text-danger font-weight-bold">
                  {currencyFormatter.format(data.price_original)}
                </td>
                <td>{data.nameStaff}</td>
                <td>
                  <p className="bg-transparent">
                    <span className="font-weight-bold">Date: </span>
                    {convertISOStringToLocaleDateString(data.timeUse)}
                  </p>
                  <p>
                    <span className="font-weight-bold">Time: </span>
                    {convertISOStringToLocaleTimeString(data.timeUse).slice(
                      0,
                      -3
                    )}
                  </p>
                </td>
                {/* <td>{data.timeUse.split(" ")[1].slice(0, -3)}</td> */}

                <td
                  className="font-weight-bold"
                  style={
                    data.nameStatus === "finished"
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  {data.nameStatus}
                </td>
                <td>{data.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
