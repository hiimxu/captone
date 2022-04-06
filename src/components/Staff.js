import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getStaffList,
  resetStaffList,
  updateSelectedStaffId,
} from "../redux/actions/creators/booking";

export default function Staff() {
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const { staffList } = useSelector((state) => state.staff);

  useEffect(() => {
    dispatch(getStaffList(serviceId));

    return () => {
      dispatch(resetStaffList());
    };
  }, [dispatch, serviceId]);

  return (
    <div className="p-5 ">
      <div className="card-group">
        {staffList?.map((staff) => (
          <div
            className="card m-2 rounded text-center"
            style={{ width: "15rem" }}
            key={staff.staffId}
          >
            <div className="">
              {/* <img className="card-img-top rounded-top mb-2 border-0" src={salon.image} alt="Salon image" style={{width:"100%",height:"20rem",objectFit: 'cover', objectPosition:"top"}} /> */}
              <i
                className="fa-solid fa-user-tie pt-3 mb-3"
                style={{ width: "100%", height: "15rem", fontSize: "15rem" }}
              ></i>
              <div className="card-body">
                <h5 className="card-title">{staff.name}</h5>
                <p className="card-text">Phone: {staff.phone}</p>
                <Link
                  to="/"
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch(updateSelectedStaffId(staff.staffId));
                  }}
                >
                  Book now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
