import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getScheduleCurrent,
  resetScheduleCurentList,
} from "../../redux/actions/creators/salon";
import { convertISOStringToLocaleTimeString } from "../../utils";
import moment from "moment";



export default function Schedule() {
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [data, setData] = useState({ day: convertDate(date) ,nameStaff:"sta"});
  

  const [staff,setStaff]=useState("");

  const dispatch = useDispatch();
  const { currentSchedule, errMess } = useSelector(
    (state) => state.scheduleCurent
  );
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );

  useEffect(() => {
    dispatch(getScheduleCurrent(token, data));
    return () => {
      dispatch(resetScheduleCurentList());
    };
  }, [dispatch, token, data]);

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
    setData({ day: convertDate(e.target.value) ,nameStaff:staff});
    console.log(data);
  };
  function convertDate(date) {
    var newdate = new Date(date),
      mnth = ("0" + (newdate.getMonth() + 1)).slice(-2),
      day = ("0" + newdate.getDate()).slice(-2);
    return [newdate.getFullYear(), mnth, day].join("-");
  }

  const confirmDialog = orderId=> (
    <div>
      
    </div>
  )

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
              <tr key={data.registerServiceID}>
                <th scope="row">{currentSchedule.indexOf(data) + 1}</th>
                <td>
                  <tr className="font-weight-bold bg-transparent" style={{ fontSize: "1.2rem", color: "#1E6296" }}>{data.nameCustomer}</tr>
                  {data.phone ? data.phone : "Salon booked"}
                </td>
                <td>{data.nameStaff}</td>
                <td>{convertISOStringToLocaleTimeString(data.timeUse).slice(
                      0,
                      -3
                    )}</td>
                <td>
                  <tr
                    className="font-weight-bold bg-transparent"
                    style={{ fontSize: "1.2rem", color: "#1E6296" }}
                  >
                    {data.nameService}
                  </tr>
                  <tr>{data.service_time} minutes</tr>
                </td>
                {/* <td>{data.timeUse.split(" ")[1].slice(0, -3)}</td> */}
                <td className="font-weight-bold" style={{color:"#ebae46", fontSize:"1.15rem"}}>{data.nameStatus}</td>
                <td>
                  <button
                    className="border-0 bg-transparent"
                    onClick={handleFinish}
                    style={{ fontSize: "1.25rem" }}
                  >
                    <i className="fa-solid fa-circle-check text-success"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="border-0 bg-transparent"
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
