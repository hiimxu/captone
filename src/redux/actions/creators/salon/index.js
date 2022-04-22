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

export const finishOrder = (token, orderID, successCallback) => (dispatch) => {
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
      if (response.data && response.message) {
        dispatch(
          finishOrderSuccessfully({
            orderIdFinished: response.data,
            successMessage: response.message,
          })
        );
        successCallback();
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

export const cancelOrder = (token, order, successCallback) => (dispatch) => {
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
      if (response.data && response.message) {
        dispatch(
          cancelOrderSuccessfully({
            orderIdCanceled: response.data,
            successMessage: response.message,
          })
        );
        successCallback();
      } else {
        dispatch(cancelcelOrderFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Cancel order failed", error);
    });
};
const cancelcelOrderFailed = (errMess) => {
  return {
    type: SalonActionTypes.CANCEL_ORDER_FAILED,
    payload: errMess,
  };
};
const cancelOrderSuccessfully = (payload) => {
  return {
    type: SalonActionTypes.CANCEL_ORDER_SUCCESSFULLY,
    payload,
  };
};

export const getListServiceForSalon = (token) => (dispatch) => {
  return fetch(`${api}api/salonowner/get/Service`, {
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
          dispatch(getListServiceForSalonFailed(errMess));
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
          getListServiceForSalonSuccesfully({
            listService: response.data,
          })
        );
      } else {
        dispatch(getListServiceForSalonFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Get list service failed", error);
    });
};
const getListServiceForSalonFailed = (errMess) => {
  return {
    type: SalonActionTypes.GET_SERVICE_LIST_FOR_SALON_FAILED,
    payload: errMess,
  };
};
const getListServiceForSalonSuccesfully = (payload) => {
  return {
    type: SalonActionTypes.GET_SERVICE_LIST_FOR_SALON_SUCCESSFULLY,
    payload,
  };
};
export const resetListServiceOfSalon = () => (dispatch) => {
  dispatch({
    type: SalonActionTypes.RESET_SERVICE_LIST_OF_SALON,
  });
};

//get profile for salon
export const getProfileOfSalon = (token) => (dispatch) => {
  return fetch(`${api}api/salonowner/profile/`, {
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
          dispatch(getProfileOfSalonFailed(errMess));
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
          getProfileOfSalonSuccesfully({
            profileSalon: response.data,
          })
        );
      } else {
        dispatch(getProfileOfSalonFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Get profile failed", error);
    });
};

const getProfileOfSalonSuccesfully = (payload) => {
  return {
    type: SalonActionTypes.GET_PROFILE_FOR_SALON_SUCCESSFULLY,
    payload,
  };
};
const getProfileOfSalonFailed = (errMess) => {
  return {
    type: SalonActionTypes.GET_PROFILE_FOR_SALON_FAILED,
    payload: errMess,
  };
};

export const addService =
  (token, serviceData, successCallback) => (dispatch) => {
    const data = new URLSearchParams({ ...serviceData });
    return fetch(`${api}api/salonowner/create/service`, {
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
            dispatch(addNewServiceFailed(errMess));
            throw error;
          }
        },
        (error) => {
          var errMess = new Error(error);
          throw errMess;
        }
      )
      .then((response) => {
        if (response.data && response.message) {
          dispatch(
            addNewServiceSuccessfully({
              newServiceAdded: response.data,
              successMessage: response.message,
            })
          );
          successCallback();
        } else {
          dispatch(addNewServiceFailed(response.message));
        }
      })
      .catch((error) => {
        console.log("Cancel order failed", error);
      });
  };
const addNewServiceFailed = (errMess) => {
  return {
    type: SalonActionTypes.ADD_NEW_SERVICE_FAILED,
    payload: errMess,
  };
};
const addNewServiceSuccessfully = (payload) => {
  return {
    type: SalonActionTypes.ADD_NEW_SERVICE_SUCCESSFULLY,
    payload,
  };
};
