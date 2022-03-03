import * as AuthActionTypes from "../../types/auth";
import { api } from "../../../../api/api";

export const login = (loginDetails) => (dispatch) => {
  const fakeAccount = {
    id: 9,
    username: "HieuBT",
    name: "Nguyen Van A",
    dateOfBirth: "1999-03-03T16:45:58.000+0000",
    gender: 1,
    role: 2,
    enabled: 0,
  };

  const data = JSON.stringify({
    account: loginDetails.username,
    password: loginDetails.password,
  });

  return fetch(`${api}api/account/login`, {
    method: "POST",
    body: data,
  })
    .then((response) => {
      console.log(response);
      dispatch(loginSuccessfully(fakeAccount)); // mock login, will update later
    })
    .catch((error) => {
      console.log("Login error: ", error.message);
    });
};

const loginSuccessfully = (account) => {
  return {
    type: AuthActionTypes.LOGIN_SUCCESSFULLY,
    payload: account,
  };
};

const loginFailed = (errMess) => {
  return {
    type: AuthActionTypes.LOGIN_FAILED,
    payload: errMess,
  };
};

export const logout = (token) => (dispatch) => {
  dispatch(logoutSuccessfully(token)); // mock logout, will update later
};

const logoutSuccessfully = (message) => {
  return {
    type: AuthActionTypes.LOGOUT_SUCCESSFULLY,
    payload: message,
  };
};
