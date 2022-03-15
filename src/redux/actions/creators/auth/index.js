import * as AuthActionTypes from "../../types/auth";
import { api } from "../../../../api/api";

export const login = (loginDetails) => (dispatch) => {
  const data = new URLSearchParams({
    account: loginDetails.username,
    password: loginDetails.password,
  });

  return fetch(`${api}api/account/login`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  })
    .then(
      async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          const errMess = (await response.json()).message;
          dispatch(loginFailed(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.accountData?.length && response.customerData?.length) {
        const accountData = response.accountData[0];
        const customerData = response.customerData[0];
        const account = { ...accountData, ...customerData };
        dispatch(loginSuccessfully(account)); // mock login, will update later
      } else {
        dispatch(loginFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Login error: ", error);
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

export const logout = () => (dispatch) => {
  dispatch(logoutSuccessfully());
};

const logoutSuccessfully = (message) => {
  return {
    type: AuthActionTypes.LOGOUT_SUCCESSFULLY,
    payload: message,
  };
};

export const register = (account) => (dispatch) => {
  const data = new URLSearchParams({
    ...account,
  });

  return fetch(`${api}api/account/add/customer`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  })
    .then(
      async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          const errMess = (await response.json()).message;
          dispatch(registerFailed(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.account && response.message) {
        dispatch(
          registerSuccessfully({
            account: response.account,
            successMessage: response.message,
          })
        );
      } else {
        dispatch(registerFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Login error: ", error);
    });
};

const registerSuccessfully = (payload) => {
  return {
    type: AuthActionTypes.SIGN_UP_SUCCESSFULLY,
    payload,
  };
};

const registerFailed = (errMess) => {
  return {
    type: AuthActionTypes.SIGN_UP_FAILED,
    payload: errMess,
  };
};
