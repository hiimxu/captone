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
      return { ...state, currentSchedule: action.payload.currentSchedule, errMess: null };
    case SalonActionTypes.RESET_SCHEDULE_CURRENT_LIST:
      return { ...state, currentSchedule: null, errMess: null };
    default:
      return state;
  }
};

export const  SalonHistory= (
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
      return { ...state, historyBooking: action.payload.historyBooking, errMess: null };
    case SalonActionTypes.RESET_HISTORY_BOOKING_LIST:
      return { ...state, historyBooking: null, errMess: null };
    default:
      return state;
  }
};
