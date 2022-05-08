import * as AdminActionTypes from "../../actions/types/admin/index";

export const ListSalonActive = (
  state = {
    listSalonActive: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case AdminActionTypes.GET_LIST_SALON_ACTIVE_FAILED:
      return { ...state, listSalonActive: null, errMess: action.payload };
    case AdminActionTypes.GET_LIST_SALON_ACTIVE_SUCCESSFULLY:
      return {
        ...state,
        listSalonActive: action.payload.listSalonActive,
        errMess: null,
      };
    case AdminActionTypes.RESET_LIST_SALON_ACTIVE:
      return { ...state, listSalonActive: null, errMess: null };
    default:
      return state;
  }
};

export const ListSalonDeactive = (
  state = {
    listSalonDeactive: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case AdminActionTypes.GET_LIST_SALON_DEACTIVE_FAILED:
      return { ...state, listSalonDeactive: null, errMess: action.payload };
    case AdminActionTypes.GET_LIST_SALON_DEACTIVE_SUCCESSFULLY:
      return {
        ...state,
        listSalonDeactive: action.payload.listSalonDeactive,
        errMess: null,
      };
    case AdminActionTypes.RESET_LIST_SALON_DEACTIVE:
      return { ...state, listSalonDeactive: null, errMess: null };
    default:
      return state;
  }
};

export const ListSalonRequest = (
  state = {
    listSalonRequest: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case AdminActionTypes.GET_LIST_SALON_REQUEST_FAILED:
      return { ...state, listSalonRequest: null, errMess: action.payload };
    case AdminActionTypes.GET_LIST_SALON_REQUEST_SUCCESSFULLY:
      return {
        ...state,
        listSalonRequest: action.payload.listSalonRequest,
        errMess: null,
      };
    case AdminActionTypes.RESET_LIST_SALON_REQUEST:
      return { ...state, listSalonRequest: null, errMess: null };
    default:
      return state;
  }
};

export const SalonBusinessInfo = (
  state = {
    salonActivated: null,
    salonDeactivated: null,
    salonPendingRequest: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case AdminActionTypes.UPDATE_SELECTED_SALON_ACTIVE_BUSINESS_INFO_SUCCESFULLY:
      return {
        ...state,
        salonActivated: action.payload,
        salonDeactivated: null,
        salonPendingRequest: null,
        errMess: null,
      };
    case AdminActionTypes.UPDATE_SELECTED_SALON_DEACTIVE_BUSINESS_INFO_SUCCESFULLY:
      return {
        ...state,
        salonActivated: null,
        salonDeactivated: action.payload,
        salonPendingRequest: null,
        errMess: null,
      };
    case AdminActionTypes.UPDATE_SELECTED_SALON_REQUEST_BUSINESS_INFO_SUCCESFULLY:
      return {
        ...state,
        salonActivated: null,
        salonDeactivated: null,
        salonPendingRequest: action.payload,
        errMess: null,
      };
    default:
      return state;
  }
};
