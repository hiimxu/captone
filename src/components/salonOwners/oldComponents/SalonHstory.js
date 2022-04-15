import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSalonBookingHistory,
  resetSalonBookingHistoryList,
} from "../../../redux/actions/creators/salon";
import {
  convertISOStringToLocaleDateString,
  convertISOStringToLocaleTimeString,
  currencyFormatter,
} from "../../../utils";

export default function SalonHstory() {
  const dispatch = useDispatch();
  const { historyBooking, errMess } = useSelector(
    (state) => state.salonHistory
  );
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );

  useEffect(() => {
    dispatch(getSalonBookingHistory(token));
    return () => {
      dispatch(resetSalonBookingHistoryList());
    };
  }, [dispatch, token]);
  return (
    <div className="m-0 p-5" style={{ backgroundColor: "#CFC787" }}>
      <div className="bg-white rounded">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Customer</th>
              <th scope="col">Service</th>
              <th scope="col">Price</th>
              <th scope="col">Stylist</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {historyBooking?.map((data) => (
              <tr key={data.registerServiceID}>
                <th scope="row">{historyBooking?.indexOf(data) + 1}</th>
                <td>
                  <tr
                    className="font-weight-bold"
                    style={{ fontSize: "1.2rem", color: "#1E6296" }}
                  >
                    {data.nameCustomer}
                  </tr>
                  {data.phone ? data.phone : "Salon booked"}
                </td>
                <td>
                  <tr
                    className="font-weight-bold"
                    style={{ fontSize: "1.2rem", color: "#1E6296" }}
                  >
                    {data.nameService}
                  </tr>
                  <tr>{data.service_time} minutes</tr>
                </td>
                <td className="text-danger font-weight-bold">
                  {currencyFormatter.format(data.price_original)}
                </td>
                <td>{data.nameStaff}</td>
                <td>
                  <tr>
                    <span className="font-weight-bold">Date: </span>
                    {convertISOStringToLocaleDateString(data.timeUse)}
                  </tr>
                  <tr>
                    <span className="font-weight-bold">Time: </span>
                    {convertISOStringToLocaleTimeString(data.timeUse).slice(
                      0,
                      -3
                    )}
                  </tr>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
