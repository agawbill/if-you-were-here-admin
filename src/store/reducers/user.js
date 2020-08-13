import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currentUser: null,
  userSuccess: null,
  editUserSuccess: null,
  deleteUserSuccess: null,
  loading: false,
  editLoading: false,
  deleteLoading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.user,
        loading: false,
      };
    case actionTypes.GET_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.GET_USER_RESET:
      return {
        ...state,
        userSuccess: null,
        currentUser: null,
        error: null,
        loading: false,
      };

    //add user logic
    case actionTypes.ADD_USER_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.ADD_USER_SUCCESS:
      return {
        ...state,
        error: null,
        userSuccess: true,
        deleteUserSuccess: null,
        loading: false,
      };
    case actionTypes.ADD_USER_FAIL:
      return {
        ...state,
        loading: false,
        userSuccess: false,
        error: action.error,
      };
    case actionTypes.ADD_USER_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        userSuccess: null,
      };

    // edit user logic below
    case actionTypes.EDIT_USER_START:
      return {
        ...state,
        editLoading: true,
        error: null,
      };
    case actionTypes.EDIT_USER_SUCCESS:
      return {
        ...state,
        editUserSuccess: true,
        currentUser: action.user,
        editLoading: false,
      };
    case actionTypes.EDIT_USER_FAIL:
      return {
        ...state,
        editLoading: false,
        editUserSuccess: false,
        error: action.error,
      };
    case actionTypes.EDIT_USER_RESET:
      return {
        ...state,
        editLoading: false,
        error: null,
        editUserSuccess: null,
        currentUser: null,
      };

    // delete user logic below
    case actionTypes.DELETE_USER_START:
      return {
        ...state,
        deleteLoading: true,
        error: null,
      };
    case actionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteUserSuccess: true,
        error: null,
        userSuccess: null,
        deleteLoading: false,
      };
    case actionTypes.DELETE_USER_FAIL:
      return {
        ...state,
        deleteLoading: false,
        deleteUserSuccess: false,
        error: action.error,
      };
    case actionTypes.DELETE_USER_RESET:
      return {
        ...state,
        deleteLoading: false,
        error: null,
        deleteUserSuccess: null,
      };
    default:
      return state;
  }
};

export default reducer;
