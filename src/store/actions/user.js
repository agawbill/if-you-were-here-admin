import * as actionTypes from "./actionTypes";

export const getUser = (id) => {
  return async (dispatch) => {
    try {
      await dispatch(getUserStart());
      const response = await fetch(`/api/users/${id}`, {
        method: "GET",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success === false) {
        throw new Error("Bad request.");
      }
      await dispatch(getUserSuccess(data.data));
    } catch (err) {
      await dispatch(getUserFail(err));
    }
  };
};

export const getUserStart = () => {
  return {
    type: actionTypes.GET_USER_START,
  };
};

export const getUserSuccess = (user) => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    user,
  };
};

export const getUserFail = (error) => {
  return {
    type: actionTypes.GET_USER_FAIL,
    error: error.message,
  };
};

export const getUserReset = () => {
  return {
    type: actionTypes.GET_USER_RESET,
  };
};
