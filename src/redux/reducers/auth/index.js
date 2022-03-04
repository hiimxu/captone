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
      return { ...state, errMess: action.payload };

    case AuthActionTypes.LOGIN_SUCCESSFULLY:
      return { ...state, account: action.payload, errMess: null };

    case AuthActionTypes.LOGOUT_SUCCESSFULLY:
      return { ...state, account: null, errMess: null };

    default:
      return state;
  }
};
