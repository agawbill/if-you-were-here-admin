import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currentResource: null,
  resourceSuccess: null,
  editResourceSuccess: null,
  deleteResourceSuccess: null,
  loading: false,
  resourceLoading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_RESOURCE_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_RESOURCE_SUCCESS:
      return {
        ...state,
        currentResource: action.resource,
        loading: false,
      };
    case actionTypes.GET_RESOURCE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.GET_RESOURCE_RESET:
      return {
        ...state,
        currentResource: null,
        error: null,
        loading: false,
      };

    //add resource logic
    case actionTypes.ADD_RESOURCE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.ADD_RESOURCE_SUCCESS:
      return {
        ...state,
        resourceSuccess: true,
        deleteResourceSuccess: null,
        error: null,
        loading: false,
      };
    case actionTypes.ADD_RESOURCE_FAIL:
      return {
        ...state,
        loading: false,
        resourceSuccess: false,
        error: action.error,
      };
    case actionTypes.ADD_RESOURCE_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        resourceSuccess: null,
      };

    // edit resource logic below
    case actionTypes.EDIT_RESOURCE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.EDIT_RESOURCE_SUCCESS:
      return {
        ...state,
        currentResource: action.resource,
        editResourceSuccess: true,
        error: null,
        loading: false,
      };
    case actionTypes.EDIT_RESOURCE_FAIL:
      return {
        ...state,
        loading: false,
        resourceSuccess: false,
        error: action.error,
      };
    case actionTypes.EDIT_RESOURCE_RESET:
      return {
        ...state,
        currentResource: null,
        loading: false,
        error: null,
        editResourceSuccess: null,
      };

    // delete resource logic below
    case actionTypes.DELETE_RESOURCE_START:
      return {
        ...state,
        resourceLoading: true,
        error: null,
      };
    case actionTypes.DELETE_RESOURCE_SUCCESS:
      return {
        ...state,
        deleteResourceSuccess: true,
        error: null,
        resourceSuccess: null,
        resourceLoading: false,
      };
    case actionTypes.DELETE_RESOURCE_FAIL:
      return {
        ...state,
        resourceLoading: false,
        deleteResourceSuccess: false,
        error: action.error,
      };
    case actionTypes.DELETE_RESOURCE_RESET:
      return {
        ...state,
        resourceLoading: false,
        error: null,
        deleteResourceSuccess: null,
      };
    default:
      return state;
  }
};

export default reducer;
