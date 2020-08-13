import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currentMessage: null,
  messageSuccess: null,
  editSuccess: null,
  approveSuccess: null,
  messageLoading: false,
  deleteLoading: false,
  deleteSuccess: null,
  editLoading: false,
  approveLoading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MESSAGE_START:
      return {
        ...state,
        messageLoading: true,
      };
    case actionTypes.FETCH_MESSAGE_SUCCESS:
      return {
        ...state,
        currentMessage: action.message,
        messageLoading: false,
      };
    case actionTypes.FETCH_MESSAGE_FAIL:
      return {
        ...state,
        messageLoading: false,
        error: `${action.error}`,
      };
    case actionTypes.RESET_MESSAGE:
      return {
        ...state,
        currentMessage: null,
        error: null,
        messageLoading: false,
      };

    // // submit message logic below

    //edit message logic
    case actionTypes.EDIT_MESSAGE_START:
      return {
        ...state,
        editLoading: true,
        error: null,
      };
    case actionTypes.EDIT_MESSAGE_SUCCESS:
      return {
        ...state,
        currentMessage: action.message,
        editSuccess: true,
        approveSuccess: false,
        editLoading: false,
      };
    case actionTypes.EDIT_MESSAGE_FAIL:
      return {
        ...state,
        editLoading: false,
        editSuccess: false,
        approveSuccess: false,
        error: action.error,
      };
    case actionTypes.EDIT_MESSAGE_RESET:
      return {
        ...state,
        editLoading: false,
        error: null,
        editSuccess: null,
        currentMessage: null,
      };

    // delete message logic below
    case actionTypes.DELETE_MESSAGE_START:
      return {
        ...state,
        deleteLoading: true,
        error: null,
      };
    case actionTypes.DELETE_MESSAGE_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
        deleteLoading: false,
        approveSuccess: null,
      };
    case actionTypes.DELETE_MESSAGE_FAIL:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: false,
        error: action.error,
      };
    case actionTypes.DELETE_MESSAGE_RESET:
      return {
        ...state,
        messageLoading: false,
        error: null,
        deleteSuccess: null,
      };

    //approve message logic below

    case actionTypes.APPROVE_MESSAGE_START:
      return {
        ...state,
        approveLoading: true,
        error: null,
      };
    case actionTypes.APPROVE_MESSAGE_SUCCESS:
      return {
        ...state,
        approveLoading: false,
        currentMessage: action.message,
        editSuccess: false,
        deleteSuccess: false,
        approveSuccess: true,
        error: null,
      };
    case actionTypes.APPROVE_MESSAGE_FAIL:
      return {
        ...state,
        approveLoading: false,
        approveSuccess: false,
        error: action.error,
      };
    case actionTypes.APPROVE_MESSAGE_RESET:
      return {
        ...state,
        approveLoading: false,
        approveSuccess: null,
        error: null,
      };

    default:
      return state;
  }
};

export default reducer;
