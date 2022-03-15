import * as AuthActionTypes from "../../actions/types/auth";

export const LoginAccount = (
  state = {
    account: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_FAILED:
      return { ...state, account: null, errMess: action.payload };

    case AuthActionTypes.LOGIN_SUCCESSFULLY:
      return { ...state, account: action.payload, errMess: null };

    case AuthActionTypes.LOGOUT_SUCCESSFULLY:
      return { ...state, account: null, errMess: null };

    default:
      return state;
  }
};

export const RegisterAccount = (
  state = {
    registeredAccount: null,
    errMess: null,
    successMessage: null,
  },
  action
) => {
  switch (action.type) {
    case AuthActionTypes.SIGN_UP_FAILED:
      return { ...state, errMess: action.payload, successMessage: null };

    case AuthActionTypes.SIGN_UP_SUCCESSFULLY:
      return {
        ...state,
        registeredAccount: action.payload.account,
        errMess: null,
        successMessage: action.payload.successMessage,
      };

    default:
      return state;
  }
};
