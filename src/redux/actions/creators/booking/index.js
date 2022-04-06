import * as BookingActionTypes from "../../types/booking";
import { api } from "../../../../api/api";

export const resetSalonList = () => (dispatch) => {
  dispatch({ type: BookingActionTypes.RESET_SALON_LIST });
};

export const updateSelectedSalonId = (salonId) => (dispatch) => {
  dispatch({
    type: BookingActionTypes.UPDATE_SELECTED_SALON_ID,
    payload: salonId,
  });
};

export const getSalonList = () => (dispatch) => {
  return fetch(`${api}api/customer/get/AllSalon`, {
    method: "GET",
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
          dispatch(getSalonListFailed(errMess));
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
        dispatch(getSalonListSuccessfully(response.data));
      } else {
        dispatch(getSalonListFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Get salon list error: ", error);
    });
};

const getSalonListSuccessfully = (salonList) => {
  return {
    type: BookingActionTypes.GET_SALON_LIST_SUCCESSFULLY,
    payload: salonList,
  };
};

const getSalonListFailed = (errMess) => {
  return {
    type: BookingActionTypes.GET_SALON_LIST_FAILED,
    payload: errMess,
  };
};

export const resetServiceList = () => (dispatch) => {
  dispatch({ type: BookingActionTypes.RESET_SERVICE_LIST });
};

export const updateSelectedServiceId = (serviceId) => (dispatch) => {
  dispatch({
    type: BookingActionTypes.UPDATE_SELECTED_SERVICE_ID,
    payload: serviceId,
  });
};

export const getServiceList = (salonId) => (dispatch) => {
  return fetch(`${api}api/customer/get/serviceOfSalon/${salonId}`, {
    method: "GET",
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
          dispatch(getServiceListFailed(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.data?.length && response.dataSalon?.length) {
        dispatch(getServiceListSuccessfully(response));
      } else {
        dispatch(getServiceListFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Get service list error: ", error);
    });
};

const getServiceListSuccessfully = (serviceList) => {
  return {
    type: BookingActionTypes.GET_SERVICE_LIST_SUCCESSFULLY,
    payload: serviceList,
  };
};

const getServiceListFailed = (errMess) => {
  return {
    type: BookingActionTypes.GET_SERVICE_LIST_FAILED,
    payload: errMess,
  };
};

export const resetStaffList = () => (dispatch) => {
  dispatch({ type: BookingActionTypes.RESET_STAFF_LIST });
};

export const updateSelectedStaffId = (staffId) => (dispatch) => {
  dispatch({
    type: BookingActionTypes.UPDATE_SELECTED_STAFF_ID,
    payload: staffId,
  });
};

export const getStaffList = (serviceId) => (dispatch) => {
  return fetch(`${api}api/customer/get/staff/${serviceId}`, {
    method: "GET",
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
          dispatch(getStaffListFailed(errMess));
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
        dispatch(getStaffListSuccessfully(response.data));
      } else {
        dispatch(getStaffListFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Get staff list error: ", error);
    });
};

const getStaffListSuccessfully = (staffList) => {
  return {
    type: BookingActionTypes.GET_STAFF_LIST_SUCCESSFULLY,
    payload: staffList,
  };
};

const getStaffListFailed = (errMess) => {
  return {
    type: BookingActionTypes.GET_STAFF_LIST_FAILED,
    payload: errMess,
  };
};
