import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getScheduleCurrent,
  resetScheduleCurentList,
  getListStaffForSalon,
  resetListStaffOfSalon,
  finishOrder,
  cancelOrder,
} from "../../redux/actions/creators/salon";
import { convertISOStringToLocaleTimeString } from "../../utils";
import moment from "moment";

export default function Schedule() {
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [data, setData] = useState({
    day: convertDate(date),
    nameStaff: "",
  });
  const [orderIdSelected, setOrderIdSelected] = useState("");
  const [orderIdCancel, setOrderIdCancel] = useState("");

  const [staff, setStaff] = useState("");

  const dispatch = useDispatch();

  const { listStaff } = useSelector((state) => state.listStaffSalon);
  const { currentSchedule, errMess } = useSelector(
    (state) => state.scheduleCurent
  );
  console.log("SCHEDULE " + currentSchedule)
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );

  useEffect(() => {
    dispatch(getListStaffForSalon(token));
    return () => {
      dispatch(resetListStaffOfSalon());
    };
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(getScheduleCurrent(token, data));
    return () => {
      dispatch(resetScheduleCurentList());
    };
  }, [dispatch, token, data]);

  // useEffect(() => {
  //   if (orderIdSelected) {
  //     dispatch(finishOrder(token, { id: orderIdSelected }));
  //   }
  //   return () => {
  //     dispatch(resetScheduleCurentList());
  //   };
  // }, [dispatch, token, orderIdSelected]);

  // useEffect(() => {
  //   if (orderIdCancel) {
  //     dispatch(
  //       cancelOrder(token, {
  //         registerServiceId: orderIdCancel.registerServiceId,
  //         service_time: orderIdCancel.service_time,
  //         note:"Customer confirmed!"
  //       })
  //     );
  //   }
  //   return () => {
  //     dispatch(resetScheduleCurentList());
  //   };
  // }, [dispatch, token, orderIdCancel]);

  const handleFinish = (orderId) => {
    setOrderIdSelected(orderId);
  };

  const handleCancel = (orderId) => {
    setOrderIdCancel(orderId);
  };

  const handleSelectDate = (e) => {
    setDate(convertDate(e.target.value));
  };

  const handleSelectStaff = (e) => {
    setStaff(e.target.value);
  };
  useEffect(() => {
    if (date) {
      setData({ day: date, nameStaff: staff });
    }
  }, [date, staff]);

  function convertDate(date) {
    var newdate = new Date(date),
      mnth = ("0" + (newdate.getMonth() + 1)).slice(-2),
      day = ("0" + newdate.getDate()).slice(-2);
    return [newdate.getFullYear(), mnth, day].join("-");
  }

  return (
    <div className="m-0 p-5" style={{ backgroundColor: "#CFC787" }}>
      <div className="row mb-4">
        <div className=" col-2 ">
          <input
            className="rounded border-0"
            type="date"
            value={date}
            onChange={handleSelectDate}
            style={{ width: "80%", height: "100%" }}
          />
        </div>
        <div className="col-2">
          <select
            className="custom-select"
            value={staff}
            onChange={handleSelectStaff}
          >
            <option value="">Choose...</option>
            {listStaff?.map((staff) => (
              <option key={staff.staffId} value={staff.name}>
                {staff.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="bg-white rounded">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Customer</th>
              <th scope="col">Stylist</th>
              <th scope="col">Time</th>
              <th scope="col">Service</th>
              <th scope="col">Status</th>
              <th scope="col">Finish</th>
              <th scope="col">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {currentSchedule?.map((data) => (
              <tr key={data.registerServiceId}>
                <th scope="row">{currentSchedule.indexOf(data) + 1}</th>
                <td>
                  <p
                    className="font-weight-bold bg-transparent"
                    style={{ fontSize: "1.2rem", color: "#1E6296" }}
                  >
                    {data.nameCustomer}
                  </p>
                  {data.phone ? data.phone : "Salon booked"}
                </td>
                <td>{data.nameStaff}</td>
                <td>
                  {convertISOStringToLocaleTimeString(data.timeUse).slice(
                    0,
                    -3
                  )}
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
                {/* <td>{data.timeUse.split(" ")[1].slice(0, -3)}</td> */}
                <td
                  className="font-weight-bold"
                  style={{ color: "#ebae46", fontSize: "1.15rem" }}
                >
                  {data.nameStatus}
                </td>
                <td>
                  <button
                    className="border-0 bg-transparent"
                    onClick={() => handleFinish(data.registerServiceId)}
                    style={{ fontSize: "1.25rem" }}
                  >
                    <i className="fa-solid fa-circle-check text-success"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="border-0 bg-transparent"
                    onClick={() => handleCancel(data)}
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
