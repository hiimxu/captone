import * as BookingActionTypes from "../../actions/types/booking";

export const Booking = (
  state = {
    selectedSalonId: null,
    selectedServiceId: null,
    selectedStaffId: null,
    selectedDate: null,
    customerInfo: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case BookingActionTypes.UPDATE_SELECTED_SALON_ID:
      return { ...state, selectedSalonId: action.payload, errMess: null };

    case BookingActionTypes.UPDATE_SELECTED_SERVICE_ID:
      return { ...state, selectedServiceId: action.payload, errMess: null };

    case BookingActionTypes.UPDATE_SELECTED_STAFF_ID:
      return { ...state, selectedStaffId: action.payload, errMess: null };

    default:
      return state;
  }
};

export const Salon = (
  state = {
    salonList: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case BookingActionTypes.GET_SALON_LIST_FAILED:
      return { ...state, salonList: null, errMess: action.payload };

    case BookingActionTypes.GET_SALON_LIST_SUCCESSFULLY:
      return { ...state, salonList: action.payload, errMess: null };

    case BookingActionTypes.RESET_SALON_LIST:
      return { ...state, salonList: null, errMess: null };

    default:
      return state;
  }
};

export const Service = (
  state = {
    serviceList: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case BookingActionTypes.GET_SERVICE_LIST_FAILED:
      return { ...state, serviceList: null, errMess: action.payload };

    case BookingActionTypes.GET_SERVICE_LIST_SUCCESSFULLY:
      return { ...state, serviceList: action.payload, errMess: null };

    case BookingActionTypes.RESET_SERVICE_LIST:
      return { ...state, serviceList: null, errMess: null };

    default:
      return state;
  }
};

export const Staff = (
  state = {
    staffList: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case BookingActionTypes.GET_STAFF_LIST_FAILED:
      return { ...state, staffList: null, errMess: action.payload };

    case BookingActionTypes.GET_STAFF_LIST_SUCCESSFULLY:
      return { ...state, staffList: action.payload, errMess: null };

    case BookingActionTypes.RESET_STAFF_LIST:
      return { ...state, staffList: null, errMess: null };

    default:
      return state;
  }
};