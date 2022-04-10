import * as ProfileActionTypes from "../../types/profile";
import { api } from "../../../../api/api";

export const getCustomerProfile = (token) => (dispatch) => {
  return fetch(`${api}api/customer/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      'x-access-token': `${token}`,
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
          dispatch(getCustomerProfileFailed(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.data?.length) {
        dispatch(getCustomerProfileSuccessfully(response.data[0]));
      } else {
        dispatch(getCustomerProfileFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Get profile error: ", error);
    });
};

const getCustomerProfileSuccessfully = (salonList) => {
  return {
    type: ProfileActionTypes.GET_CUSTOMER_PROFILE_SUCCESSFULLY,
    payload: salonList,
  };
};

const getCustomerProfileFailed = (errMess) => {
  return {
    type: ProfileActionTypes.GET_CUSTOMER_PROFILE_FAILED,
    payload: errMess,
  };
};
