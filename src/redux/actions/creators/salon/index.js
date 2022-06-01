import * as SalonActionTypes from "../../types/salon";
import { api } from "../../../../api/api";

//GET CURRENT SCHEDULE
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

//GET BOOKING HISTORY
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

//GET LIST STAFF
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

//FINISH CURRENT ORDER
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

//CANCEL CURRENT ORDER
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

//GET LIST SERVICE
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

// //ADD NEW SERVICE
export const addService =
(token, serviceData, successCallback, errCallback) => (dispatch) => {
  const data = new FormData();
  data.append("name", serviceData.name);
  data.append("price", serviceData.price);
  data.append("promotion", serviceData.promotion);
  data.append("content",serviceData.content);
  data.append("description",serviceData.description);
  data.append('image', serviceData.image);
  data.append("service_time",serviceData.service_time)
    return fetch(`${api}api/salonowner/createServiceByFirebase`, {
      method: "POST",
      body: data,
      headers: {
      
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
          errCallback(errMess)
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
          successCallback(response.message);
        } else {
          dispatch(addNewServiceFailed(response.message));
          errCallback(response.message)
        }
      })
      .catch((error) => {
        console.log("Add new service failed", error);
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

// //ADD NEW SERVICE
// export const addService =
//   (token, serviceData, successCallback) => (dispatch) => {
//     const formData = new FormData();

//     formData.append('service',JSON.stringify(serviceData))
//     return fetch(`${api}api/salonowner/create/serviceUploadImage`, {
//       method: "POST",
//       body: formData,
//       headers: {
//         'Content-type': 'multipart/form-data',
//         "x-access-token": `${token}`,
//       },
//     })
//       .then(
//         async (response) => {
//           if (response.ok) {
//             return response.json();
//           } else {
//             var error = new Error(
//               "Error " + response.status + ": " + response.statusText
//             );
//             const errMess = (await response.json()).message;
//             dispatch(addNewServiceFailed(errMess));
//             throw error;
//           }
//         },
//         (error) => {
//           var errMess = new Error(error);
//           throw errMess;
//         }
//       )
//       .then((response) => {
//         if (response.data && response.message) {
//           dispatch(
//             addNewServiceSuccessfully({
//               newServiceAdded: response.data,
//               successMessage: response.message,
//             })
//           );
//           successCallback();
//         } else {
//           dispatch(addNewServiceFailed(response.message));
//         }
//       })
//       .catch((error) => {
//         console.log("Add new service failed", error);
//       });
//   };
// const addNewServiceFailed = (errMess) => {
//   return {
//     type: SalonActionTypes.ADD_NEW_SERVICE_FAILED,
//     payload: errMess,
//   };
// };
// const addNewServiceSuccessfully = (payload) => {
//   return {
//     type: SalonActionTypes.ADD_NEW_SERVICE_SUCCESSFULLY,
//     payload,
//   };
// };

//ADD NEW STAFF
export const addStaff = (token, staffData, successCallback) => (dispatch) => {
  const data = new URLSearchParams({ ...staffData });
  return fetch(`${api}api/salonowner/create/staff`, {
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
          dispatch(addNewStaffFailed(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.data && response.success) {
        dispatch(
          addNewStaffSuccessfully({
            newStaffAdded: response.data,
            successMessage: response.success,
          })
        );
        successCallback();
      } else {
        dispatch(addNewStaffFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Add new staff failed", error);
    });
};
const addNewStaffFailed = (errMess) => {
  return {
    type: SalonActionTypes.ADD_NEW_STAFF_FAILED,
    payload: errMess,
  };
};
const addNewStaffSuccessfully = (payload) => {
  return {
    type: SalonActionTypes.ADD_NEW_STAFF_SUCCESSFULLY,
    payload,
  };
};

//EDIT STAFF PROFILE
export const editStaff =
  (token, staffData, successCallback, staffId) => (dispatch) => {
    const data = new URLSearchParams({ ...staffData });
    return fetch(`${api}api/salonowner/update/staff/${staffId}`, {
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
            dispatch(editStaffFailed(errMess));
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
            editStaffSuccessfully({
              staffEdited: response.data,
              successMess: response.message,
            })
          );
          successCallback();
        } else {
          dispatch(editStaffFailed(response.message));
        }
      })
      .catch((error) => {
        console.log("Edit staff failed", error);
      });
  };
const editStaffFailed = (errMess) => {
  return {
    type: SalonActionTypes.EDIT_STAFF_INFO_FAILED,
    payload: errMess,
  };
};
const editStaffSuccessfully = (payload) => {
  return {
    type: SalonActionTypes.EDIT_STAFF_INFO_SUCCESSFULLY,
    payload,
  };
};

//DELETE STAFF
export const deleteStaff =
  (token, staffData, successCallback) => (dispatch) => {
    const data = new URLSearchParams({ ...staffData });
    return fetch(`${api}api/salonowner/impossible/staff/`, {
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
            dispatch(deleteStaffFailed(errMess));
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
            deleteStaffSuccessfully({
              staffIdDeleted: response.data,
              successMess: response.message,
            })
          );
          if (successCallback) {
            setTimeout(() => {
              successCallback();
            }, 2000);
          }
        } else {
          dispatch(deleteStaffFailed(response.message));
        }
      })
      .catch((error) => {
        console.log("Delete staff failed", error);
      });
  };
const deleteStaffFailed = (errMess) => {
  return {
    type: SalonActionTypes.DELETE_STAFF_FAILED,
    payload: errMess,
  };
};
const deleteStaffSuccessfully = (payload) => {
  return {
    type: SalonActionTypes.DELETE_STAFF_SUCCESSFULLY,
    payload,
  };
};

//DELETE SERVICE
export const deleteService =
  (token, serviceData, successCallback) => (dispatch) => {
    const data = new URLSearchParams({ ...serviceData });
    return fetch(`${api}api/salonowner/update/impossibleService/`, {
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
            dispatch(deleteServiceFailed(errMess));
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
            deleteServiceSuccessfully({
              serviceIdDeleted: response.data,
              successMess: response.message,
            })
          );
          successCallback();
        } else {
          dispatch(deleteStaffFailed(response.message));
        }
      })
      .catch((error) => {
        console.log("Delete service failed", error);
      });
  };
const deleteServiceFailed = (errMess) => {
  return {
    type: SalonActionTypes.DELETE_SERVICE_FAILED,
    payload: errMess,
  };
};
const deleteServiceSuccessfully = (payload) => {
  return {
    type: SalonActionTypes.DELETE_SERVICE_SUCCESSFULLY,
    payload,
  };
};

// EDIT SERVICE
export const editService =
(token, serviceData, successCallback, serviceId, errorCallback) => (dispatch) => {
    const data = new URLSearchParams({ ...serviceData });
    return fetch(`${api}api/salonowner/update/Service/${serviceId}`, {
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
            dispatch(editServiceFailed(errMess));
            errorCallback(errMess);
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
            editServiceSuccessfully({
              serviceEdited: response.data,
              successMess: response.message,
            })
          );
          if (successCallback) {
            setTimeout(() => {
              successCallback();
            }, 1000);
          }
        } else {
          dispatch(editServiceFailed(response.message));
        }
      })
      .catch((error) => {
        console.log("Edit service failed", error);
      });
  };
const editServiceFailed = (errMess) => {
  return {
    type: SalonActionTypes.EDIT_SERVICE_FAILED,
    payload: errMess,
  };
};
const editServiceSuccessfully = (payload) => {
  return {
    type: SalonActionTypes.EDIT_SERVICE_SUCCESSFULLY,
    payload,
  };
};

// EDIT SERVICE FIREBASE
export const editServiceFirebase =
  (token, serviceData, successCallback, serviceId, errorCallback) => (dispatch) => {
    const data = new FormData();

    data.append("name", serviceData.name);
    data.append("price", serviceData.price);
    data.append("promotion", serviceData.promotion);
    data.append("content",serviceData.content);
    data.append("description",serviceData.description);
    data.append('image', serviceData.image);
    data.append("service_time",serviceData.service_time)
    return fetch(`${api}api/salonowner/editServiceByFirebase/${serviceId}`, {
      method: "PUT",
      body: data,
      headers: {

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
            dispatch(editServiceFirebaseFailed(errMess));
            console.log('error',errMess)
            errorCallback(errMess);
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
            editServiceFirebaseSuccessfully({
              editServiceFirebase: response.data,
              successMess: response.message,
            })
          );
          if (successCallback) {
            setTimeout(() => {
              successCallback();
            }, 1000);
          }
        } else {
          dispatch(editServiceFirebaseFailed(response.message));
        }
      })
      .catch((error) => {
        console.log("Edit service failed", error);
      });
  };
const editServiceFirebaseFailed = (errMess) => {
  return {
    type: SalonActionTypes.EDIT_SERVICE_FIREBASE_FAILED,
    payload: errMess,
  };
};
const editServiceFirebaseSuccessfully = (payload) => {
  return {
    type: SalonActionTypes.EDIT_SERVICE_FIREBASE_SUCCESSFULLY,
    payload,
  };
};


// EDIT SALON BUSINESS INFO
export const editSalonBusinessInfo =
(token, infoData, successCallback, errorCallback) => (dispatch) => {
    const data = new URLSearchParams({ ...infoData });
    return fetch(`${api}api/salonowner/update/salonBusinessInformation/`, {
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
            dispatch(editBusinessInfoFailed(errMess));
            errorCallback(errMess)
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
            editBusinessInfoSuccessfully({
              businessInfoEdited: response.data,
              infoSuccessMess: response.message,
            })
          );
          if (successCallback) {
            setTimeout(() => {
              successCallback(response.message);
            }, 1000);
          }
        } else {
          dispatch(editBusinessInfoFailed(response.message));
        }
      })
      .catch((error) => {
        console.log("Edit business info failed", error);
      });
  };
const editBusinessInfoFailed = (errMess) => {
  return {
    type: SalonActionTypes.EDIT_SALON_BUSINESS_INFO_FAILED,
    payload: errMess,
  };
};
const editBusinessInfoSuccessfully = (payload) => {
  return {
    type: SalonActionTypes.EDIT_SALON_BUSINESS_INFO_SUCCESSFULLY,
    payload,
  };
};

// EDIT SALON BUSINESS INFO
export const editSalonBusinessInfoFirebase =
  (token, infoData, successCallback, errorCallback) => (dispatch) => {
    const data = new FormData();
    data.append("nameSalon",infoData.nameSalon);
    data.append("nameOwner",infoData.nameOwner);
    data.append("email",infoData.email);
    data.append("phone",infoData.phone);
    data.append("taxCode",infoData.taxCode);
    data.append("district",infoData.district);
    data.append("city",infoData.city);
    data.append("detailAddress",infoData.detailAddress);
    data.append("timeOpen",infoData.timeOpen);
    data.append("timeClose",infoData.timeClose);
    data.append("image",infoData.image);
    return fetch(`${api}api/salonowner/update/salonBusinessInformationByFireBase/`, {
      method: "PUT",
      body: data,
      headers: {

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
            dispatch(editSalonBusinessInfoFirebaseFailed(errMess));
            errorCallback(errMess)
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
            editSalonBusinessInfoFirebaseSuccessfully({
              businessInfoEdited: response.data,
              successMess: response.message,
            })
          );
          if (successCallback) {
            setTimeout(() => {
              successCallback(response.message);
            }, 1500);
          }
        } else {
          dispatch(editSalonBusinessInfoFirebaseFailed(response.message));
        }
      })
      .catch((error) => {
        console.log("Edit business info failed", error);
      });
  };
const editSalonBusinessInfoFirebaseFailed = (errMess) => {
  return {
    type: SalonActionTypes.EDIT_SALON_BUSINESS_INFO_FAILED,
    payload: errMess,
  };
};
const editSalonBusinessInfoFirebaseSuccessfully = (payload) => {
  return {
    type: SalonActionTypes.EDIT_SALON_BUSINESS_INFO_SUCCESSFULLY,
    payload,
  };
};


// EDIT SALON INFO
export const editSalonInfo =
  (token, infoData, successCallback) => (dispatch) => {
    const data = new URLSearchParams({ ...infoData });
    return fetch(`${api}api/salonowner/update/salonInformationForCustomer/`, {
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
            dispatch(editSalonInfoFailed(errMess));
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
            editSalonInfoSuccessfully({
              salonInfoEdited: response.data,
              successMessage: response.message,
            })
          );
          if (successCallback) {
            setTimeout(() => {
              successCallback();
            }, 1500);
          }
        } else {
          dispatch(editSalonInfoFailed(response.message));
        }
      })
      .catch((error) => {
        console.log("Edit business info failed", error);
      });
  };
const editSalonInfoFailed = (errMess) => {
  return {
    type: SalonActionTypes.EDIT_SALON_INFO_FAILED,
    payload: errMess,
  };
};
const editSalonInfoSuccessfully = (payload) => {
  return {
    type: SalonActionTypes.EDIT_SALON_INFO_SUCCESSFULLY,
    payload,
  };
};

// EDIT SALON INFO FIREBASE
export const editSalonInfoFirebase =
  (token, infoData, successCallback) => (dispatch) => {
    const data = new FormData();
    data.append("nameSalon",infoData.nameSalon);
    data.append("phone",infoData.phone);
    data.append("timeOpen",infoData.timeOpen);
    data.append("timeClose",infoData.timeClose);
    data.append("city",infoData.city);
    data.append("district",infoData.district);
    data.append("detailAddress",infoData.detailAddress);
    data.append("description",infoData.description);
    data.append("image",infoData.image);

    return fetch(`${api}api/salonowner/update/salonInformationFirebase/`, {
      method: "PUT",
      body: data,
      headers: {
       
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
            dispatch(editSalonInfoFailed(errMess));
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
            editSalonInfoFirebaseSuccessfully({
              salonInfoEdited: response.data,
              successMessage: response.message,
            })
          );
          if (successCallback) {
            setTimeout(() => {
              successCallback();
            }, 1500);
          }
        } else {
          dispatch(editSalonInfoFirebaseFailed(response.message));
        }
      })
      .catch((error) => {
        console.log("Edit business info failed", error);
      });
  };
const editSalonInfoFirebaseFailed = (errMess) => {
  return {
    type: SalonActionTypes.EDIT_SALON_INFO_FAILED,
    payload: errMess,
  };
};
const editSalonInfoFirebaseSuccessfully = (payload) => {
  return {
    type: SalonActionTypes.EDIT_SALON_INFO_SUCCESSFULLY,
    payload,
  };
};

//GET CALENDAR
export const getCalendar = (token, info) => (dispatch) => {
  const data = new URLSearchParams({ ...info });
  return fetch(`${api}api/salonowner/staffCanledar`, {
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
          dispatch(getCalendarFailed(errMess));
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
          getCalendarSuccesfully({
            listCalendar: response.data,
          })
        );
      } else {
        dispatch(getCalendarFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Get calendar failed", error);
    });
};

const getCalendarSuccesfully = (payload) => {
  return {
    type: SalonActionTypes.GET_LIST_STAFF_CALENDAR_SUCCESSFULLY,
    payload,
  };
};
const getCalendarFailed = (errMess) => {
  return {
    type: SalonActionTypes.GET_LIST_STAFF_CALENDAR_FAILED,
    payload: errMess,
  };
};

export const resetCalendar = () => (dispatch) => {
  dispatch({
    type: SalonActionTypes.RESET_LIST_STAFF_CALENDAR,
  });
};

//SALON BOOKING
export const salonBooking = (token, bookingData, callback) => (dispatch) => {
  const data = new URLSearchParams({ ...bookingData });
  return fetch(`${api}api/salonowner/bookingService`, {
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
          dispatch(salonBookingFailed(errMess));
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
          salonBookingSuccesfully({
            bookingInfo: response.data,
            successMess: response.message,
          })
        );
        if (callback) {
          setTimeout(() => {
            callback();
          }, 500);
        }
      } else {
        dispatch(salonBookingFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Salon booking failed", error);
    });
};

const salonBookingSuccesfully = (payload) => {
  return {
    type: SalonActionTypes.BOOKING_NEW_SERVICE_SUCCESSFULLY,
    payload,
  };
};
const salonBookingFailed = (errMess) => {
  return {
    type: SalonActionTypes.BOOKING_NEW_SERVICE_FAILED,
    payload: errMess,
  };
};
