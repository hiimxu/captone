import * as SalonActionTypes from "../../actions/types/salon/index";

export const SheduleCurent = (
  state = {
    currentSchedule: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case SalonActionTypes.GET_SCHEDULE_CURRENT_FAILED:
      return { ...state, currentSchedule: null, errMess: action.payload };
    case SalonActionTypes.GET_SCHEDULE_CURRENT_SUCCESSFULLY:
      return {
        ...state,
        currentSchedule: action.payload.currentSchedule,
        errMess: null,
      };
    case SalonActionTypes.RESET_SCHEDULE_CURRENT_LIST:
      return { ...state, currentSchedule: null, errMess: null };
    default:
      return state;
  }
};

export const SalonHistory = (
  state = {
    historyBooking: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case SalonActionTypes.GET_HISTORY_BOOKING_FAILED:
      return { ...state, historyBooking: null, errMess: action.payload };
    case SalonActionTypes.GET_HISTORY_BOOKING_SUCCESSFULLY:
      return {
        ...state,
        historyBooking: action.payload.historyBooking,
        errMess: null,
      };
    case SalonActionTypes.RESET_HISTORY_BOOKING_LIST:
      return { ...state, historyBooking: null, errMess: null };
    default:
      return state;
  }
};

export const ListStaffSalon = (
  state = {
    listStaff: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case SalonActionTypes.GET_STAFF_LIST_FOR_SALON_FAILED:
      return { ...state, listStaff: null, errMess: action.payload.errMess };
    case SalonActionTypes.GET_STAFF_LIST_FOR_SALON_SUCCESSFULLY:
      return { ...state, listStaff: action.payload.listStaff, errMess: null };
    case SalonActionTypes.RESET_STAFF_LIST_OF_SALON:
      return { ...state, listStaff: null, errMess: null };
    default:
      return state;
  }
};


export const ListService =(
  state = {
    listService: null,
    errMess: null,
  },
  action
)=> {
  switch (action.type) {
    case SalonActionTypes.GET_SERVICE_LIST_FOR_SALON_FAILED:
      return { ...state, listService: null, errMess: action.payload.errMess };
    case SalonActionTypes.GET_SERVICE_LIST_FOR_SALON_SUCCESSFULLY:
      return { ...state, listService: action.payload.listService, errMess: null };
    case SalonActionTypes.RESET_SERVICE_LIST_OF_SALON:
      return { ...state, listService: null, errMess: null };
    default:
      return state;
  }
};

