import * as actionTypes from "../actions/actionTypes";

const initialState = {
  expirationDate: null,
  isAuthenticated: null,
  notificationSuccess: null,
  loading: false,
  token: null,
  user: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHECK_AUTH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        expirationDate: false,
        token: false,
        user: null,
        error: action.error,
      };
    case actionTypes.CHECK_AUTH_SUCCESS:
      const [id, name, email, role, notifications] = action.user.split("-");
      const user = {
        id,
        name,
        email,
        role,
        notifications: JSON.parse(notifications),
      };
      return {
        ...state,
        user,
        expirationDate: action.expiration,
        token: action.token,
        isAuthenticated: true,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        ...initialState,
        isAuthenticated: false,
      };

    //toggle notifications
    case actionTypes.TOGGLE_NOTIFICATION_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.TOGGLE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notificationSuccess: true,
        error: null,
        user: { ...state.user, notifications: action.user.notifications },
      };
    case actionTypes.TOGGLE_NOTIFICATION_FAIL:
      return {
        ...state,
        loading: false,
        notificationSuccess: false,
        error: action.error,
      };
    case actionTypes.TOGGLE_NOTIFICATION_RESET:
      return {
        ...state,
        loading: false,
        notificationSuccess: null,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
