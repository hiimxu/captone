import * as ProfileActionTypes from "../../actions/types/profile";

export const Profile = (
  state = {
    info: {
      customerId: null,
      nameCustomer: null,
      phone: null,
      address: null,
      birthday: null,
      accountId: null,
    },
    errmess: null,
  },
  action
) => {
  switch (action.type) {
    case ProfileActionTypes.GET_CUSTOMER_PROFILE_FAILED:
      return { ...state, info: null, errMess: action.payload };

    case ProfileActionTypes.GET_CUSTOMER_PROFILE_SUCCESSFULLY:
      return { ...state, info: action.payload, errMess: null };

    default:
      return state;
  }
};
