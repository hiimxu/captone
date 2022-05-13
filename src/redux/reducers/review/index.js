import * as ReviewActionTypes from "../../actions/types/review";

export const ListReviewForCustomer = (
  state = {
    listReview: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ReviewActionTypes.GET_REVIEW_FOR_CUSTOMER_FAILED:
      return { ...state, listReview: null, errMess: action.payload.errMess };
    case ReviewActionTypes.GET_REVIEW_FOR_CUSTOMER_SUCCESSFULLY:
      return {
        ...state,
        listReview: action.payload.listReview,
        errMess: null,
      };
    case ReviewActionTypes.RESET_LIST_REVIEW_FOR_CUSTOMER:
      return { ...state, listReview: null, errMess: null };
    default:
      return state;
  }
};

export const AddReviewForCustomer = (
  state = {
    reviewData: null,
    successMessage: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ReviewActionTypes.ADD_REVIEW_FOR_CUSTOMER_FAILED:
      return {
        ...state,
        reviewData: null,
        successMessage: null,
        errMess: action.payload.errMess,
      };
    case ReviewActionTypes.ADD_REVIEW_FOR_CUSTOMER_SUCCESSFULLY:
      return {
        ...state,
        reviewData: action.payload.reviewData,
        successMessage: action.payload.successMessage,
        errMess: null,
      };
    case ReviewActionTypes.GET_REVIEW_FOR_CUSTOMER_SUCCESSFULLY:
      return {
        ...state,
        reviewData: null,
        successMessage: null,
        errMess: null,
      };
    default:
      return state;
  }
};
