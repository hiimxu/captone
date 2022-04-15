import * as SalonActionTypes from "../../types/salon";
import { api } from "../../../../api/api";

export const getScheduleCurrent = (token, info) => (dispatch) => {
  const data = new URLSearchParams({ ...info });
  return fetch(`${api}api/salonowner/current`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "x-access-token": `${token}`,
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
          dispatch(getScheduleCurrentFail(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.data?.length && response.message) {
        dispatch(
          getScheduleCurrentSuccessfully({
            currentSchedule: response.data,
            successMessage: response.message,
          })
        );
      } else {
        dispatch(getScheduleCurrentFail(response.message));
      }
    })
    .catch((error) => {
      console.log("Get schedule failed", error);
    });
};

const getScheduleCurrentSuccessfully = (payload) => {
  return {
    type: SalonActionTypes.GET_SCHEDULE_CURRENT_SUCCESSFULLY,
    payload,
  };
};

const getScheduleCurrentFail = (errMess) => {
  return {
    type: SalonActionTypes.GET_SCHEDULE_CURRENT_FAILED,
    payload: errMess,
  };
};

export const resetScheduleCurentList = () => (dispatch) => {
  dispatch({
    type: SalonActionTypes.RESET_SCHEDULE_CURRENT_LIST,
  });
};

export const getSalonBookingHistory = (token, date) => (dispatch) => {
  const data = new URLSearchParams({ ...date });
  return fetch(`${api}api/salonowner/ordersHistory`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "x-access-token": `${token}`,
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
          dispatch(getSalonBookingHistoryFailed(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.data?.length && response.message) {
        dispatch(
          getSalonBookingHistorySuccesfully({
            historyBooking: response.data,
            successMessage: response.message,
          })
        );
      } else {
        dispatch(getSalonBookingHistoryFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Get booking order history failed", error);
    });
};

const getSalonBookingHistorySuccesfully = (payload) => {
  return {
    type: SalonActionTypes.GET_HISTORY_BOOKING_SUCCESSFULLY,
    payload,
  };
};

const getSalonBookingHistoryFailed = (errMess) => {
  return {
    type: SalonActionTypes.GET_HISTORY_BOOKING_FAILED,
    payload: errMess,
  };
};

export const resetSalonBookingHistoryList = () => (dispatch) => {
  dispatch({
    type: SalonActionTypes.RESET_HISTORY_BOOKING_LIST,
  });
};

export const getListStaffForSalon = (token) => (dispatch) => {
  return fetch(`${api}api/salonowner/staff`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "x-access-token": `${token}`,
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
          dispatch(getListStaffForSalonFailed(errMess));
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
        dispatch(
          getListStaffForSalonSuccesfully({
            listStaff: response.data,
          })
        );
      } else {
        dispatch(getListStaffForSalonFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Get list staff failed", error);
    });
};

const getListStaffForSalonFailed = (errMess) => {
  return {
    type: SalonActionTypes.GET_STAFF_LIST_FOR_SALON_FAILED,
    payload: errMess,
  };
};

const getListStaffForSalonSuccesfully = (payload) => {
  return {
    type: SalonActionTypes.GET_STAFF_LIST_FOR_SALON_SUCCESSFULLY,
    payload,
  };
};

export const resetListStaffOfSalon = () => (dispatch) => {
  dispatch({
    type: SalonActionTypes.RESET_STAFF_LIST_OF_SALON,
  });
};

export const finishOrder = (token, orderID) => (dispatch) => {
  const data = new URLSearchParams({ ...orderID });
  return fetch(`${api}api/salonowner/update/finshBooking`, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "x-access-token": `${token}`,
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
          dispatch(finishOrderFailed(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.data?.length && response.message) {
        dispatch(
          finishOrderSuccessfully({
            orderIdFinished: response.data,
            successMessage: response.message,
          })
        );
      } else {
        dispatch(finishOrderFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Get schedule failed", error);
    });
};
const finishOrderFailed = (errMess) => {
  return {
    type: SalonActionTypes.FINISH_ORDER_FAILED,
    payload: errMess,
  };
};
const finishOrderSuccessfully = (payload) => {
  return {
    type: SalonActionTypes.FINISH_ORDER_SUCCESSFULLY,
    payload,
  };
};

export const cancelOrder = (token, order) => (dispatch) => {
  const data = new URLSearchParams({ ...order });
  return fetch(`${api}api/salonowner/cancelBookingServiceBySalon`, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "x-access-token": `${token}`,
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
          dispatch(cancelcelOrderFailed(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.data?.length && response.message) {
        dispatch(
          cancelOrderSuccessfully({
            orderIdCanceled: response.data,
            successMessage: response.message,
          })
        );
      } else {
        dispatch(cancelcelOrderFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Get schedule failed", error);
    });
};
const cancelcelOrderFailed = (errMess) => {
  return {
    type: SalonActionTypes.FINISH_ORDER_FAILED,
    payload: errMess,
  };
};
const cancelOrderSuccessfully = (payload) => {
  return {
    type: SalonActionTypes.FINISH_ORDER_SUCCESSFULLY,
    payload,
  };
};
