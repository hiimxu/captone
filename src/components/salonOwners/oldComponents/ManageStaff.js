import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListStaffForSalon,
  resetListStaffOfSalon,
} from "../../../redux/actions/creators/salon";

export default function ManageStaff() {
  const dispatch = useDispatch();
  const { listStaff } = useSelector((state) => state.listStaffSalon);
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );

  useEffect(() => {
    dispatch(getListStaffForSalon(token));
    return () => {
      dispatch(resetListStaffOfSalon());
    };
  }, [dispatch, token]);

  return (
    <div className="p-4">
      <div className="pb-4">
        <button type="button" className="btn btn-primary" >
          Add
        </button>
      </div>
      <div className="bg-white rounded">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Barber</th>
              <th scope="col">Level</th>
              <th scope="col">Contact</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {listStaff?.map((data) => (
              <tr key={data.staffId}>
                <th scope="row">{listStaff.indexOf(data) + 1}</th>
                <td
                  className="font-weight-bold bg-transparent"
                  style={{ fontSize: "1.2rem", color: "#1E6296" }}
                >
                  {data.name}
                </td>
                <td>{data.title}</td>
                <td>
                  <i className="fa-solid fa-phone pr-2"></i>
                  {data.phone}
                </td>
                <td>
                  <button
                    type="button"
                    className="border-0 bg-transparent"
                    style={{ fontSize: "1.25rem" }}
                  >
                    <i className="fa-solid fa-pen text-primary"></i>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="border-0 bg-transparent"
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
