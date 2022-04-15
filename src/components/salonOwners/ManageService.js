import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListServiceForSalon,
  resetListServiceOfSalon,
} from "../../redux/actions/creators/salon";
import{currencyFormatter} from "../../utils/index"

export default function ManageBooking() {
  const dispatch = useDispatch();
  const { listService } = useSelector((state) => state.listServiceSalon);
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );
  useEffect(() => {
    dispatch(getListServiceForSalon(token));
    return () => {
      dispatch(resetListServiceOfSalon());
    };
  }, [dispatch, token]);
  return (
    <div>
      <div className="pb-4">
        <button type="button" className="btn btn-primary">
          Add
        </button>
      </div>
      <div className="m-5">
        {listService?.map((data)=>(
          <div className="card mb-3" style={{ backgroundColor: "#E0DAA4", maxHeight: "20rem" }} key={data.serviceId}>
          <div className="row g-0">
            <div className="col-md-5">
              <img
                src={data.image }
                className="img-fluid rounded-start rounded-left"
                alt="..."
                style={{ maxHeight: "20rem" }}
              />
            </div>
            <div className="col-md-5">
              <div className="card-body">
                <h4 className="card-title text-info">{data.name}</h4>
                <p className="card-text text-danger font-weight-bold" style={{ fontSize: "1.5rem" }}>
                  <span className="font-weight-normal text-dark" style={{ fontSize: "1.1rem" }}>
                    {data.service_time} minutes .{" "}
                  </span>
                  {currencyFormatter.format(data.price)}
                </p>
                <p className="card-text">{data.description}</p>
              </div>
            </div>
            <div className="col-md-2 mt-5">
              <button></button>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}
