import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currentPerson: null,
  personSuccess: null,
  editPersonSuccess: null,
  loading: false,
  deleteLoading: false,
  positionLoading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PERSON_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_PERSON_SUCCESS:
      return {
        ...state,
        currentPerson: action.person,
        loading: false,
      };
    case actionTypes.GET_PERSON_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.GET_PERSON_RESET:
      return {
        ...state,
        currentPerson: null,
        error: null,
        loading: false,
      };

    //add person logic
    case actionTypes.ADD_PERSON_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.ADD_PERSON_SUCCESS:
      return {
        ...state,
        personSuccess: true,
        loading: false,
      };
    case actionTypes.ADD_PERSON_FAIL:
      return {
        ...state,
        loading: false,
        personSuccess: false,
        error: action.error,
      };
    case actionTypes.ADD_PERSON_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        personSuccess: null,
      };

    // edit person logic below
    case actionTypes.EDIT_PERSON_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.EDIT_PERSON_SUCCESS:
      return {
        ...state,
        editPersonSuccess: true,
        currentPerson: action.person,
        loading: false,
      };
    case actionTypes.EDIT_PERSON_FAIL:
      return {
        ...state,
        loading: false,
        personSuccess: false,
        error: action.error,
      };
    case actionTypes.EDIT_PERSON_RESET:
      return {
        ...state,
        currentPerson: null,
        loading: false,
        error: null,
        editPersonSuccess: null,
      };

    // delete person logic below
    case actionTypes.DELETE_PERSON_START:
      return {
        ...state,
        deleteLoading: true,
        error: null,
      };
    case actionTypes.DELETE_PERSON_SUCCESS:
      return {
        ...state,
        personSuccess: true,
        deleteLoading: false,
      };
    case actionTypes.DELETE_PERSON_FAIL:
      return {
        ...state,
        deleteLoading: false,
        personSuccess: false,
        error: action.error,
      };
    case actionTypes.DELETE_PERSON_RESET:
      return {
        ...state,
        deleteLoading: false,
        error: null,
        personSuccess: null,
      };

    //order person logic
    case actionTypes.ORDER_PERSON_START:
      return {
        ...state,
        positionLoading: true,
        error: null,
      };
    case actionTypes.ORDER_PERSON_SUCCESS:
      return {
        ...state,
        positionLoading: false,
        error: null,
      };
    case actionTypes.ORDER_PERSON_FAIL:
      return {
        ...state,
        positionLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
