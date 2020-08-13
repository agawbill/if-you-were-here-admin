import * as actionTypes from "../actions/actionTypes";

const initialState = {
  resources: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_RESOURCES_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_RESOURCES_SUCCESS:
      return {
        ...state,
        resources: [...action.resources],
        loading: false,
      };
    case actionTypes.GET_RESOURCES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.GET_RESOURCES_RESET:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
