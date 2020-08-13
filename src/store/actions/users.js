import * as actionTypes from "./actionTypes";

export const getUsers = () => {
  return async (dispatch) => {
    try {
      await dispatch(getUsersStart());
      const response = await fetch("/api/users", {
        method: "GET",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      await dispatch(getUsersSuccess(data.data));
    } catch (err) {
      await dispatch(getUsersFail(err));
    }
  };
};

export const getUsersStart = () => {
  return {
    type: actionTypes.GET_USERS_START,
  };
};

export const getUsersSuccess = (users) => {
  return {
    type: actionTypes.GET_USERS_SUCCESS,
    users,
  };
};

export const getUsersFail = (error) => {
  return {
    type: actionTypes.GET_USERS_FAIL,
    error: error.message,
  };
};

export const getUsersReset = () => {
  return {
    type: actionTypes.GET_USERS_RESET,
  };
};
