import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileOfSalon } from "../../../redux/actions/creators/salon";

export default function SalonProfile() {
  const dispatch = useDispatch();
  //call redux store
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );
  const { profileSalon } = useSelector((state) => state.profileSalon);
  console.log(profileSalon)

  //call API
  useEffect(() => {
    dispatch(getProfileOfSalon(token));
  }, [dispatch,token]);

  return <div>SalonProfile</div>;
}
