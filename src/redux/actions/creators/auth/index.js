import * as AuthActionTypes from "../../types/auth";

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
  dispatch(loginSuccessfully(fakeAccount)); // mock login, will update later
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
