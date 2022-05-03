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