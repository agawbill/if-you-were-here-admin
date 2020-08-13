import * as actionTypes from "../actions/actionTypes";

const initialState = {
  persons: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PERSONS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_PERSONS_SUCCESS:
      return {
        ...state,
        persons: [...action.persons],
        loading: false,
      };
    case actionTypes.GET_PERSONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.GET_PERSONS_RESET:
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
