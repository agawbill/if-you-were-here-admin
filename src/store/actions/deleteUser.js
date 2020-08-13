import * as actionTypes from "./actionTypes";

export const deleteUser = (id, token) => {
  return async (dispatch) => {
    try {
      dispatch(deleteUserStart());
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });
      const data = await response.json();
      if (data.success === false) {
        throw new Error("Bad request.");
      }
      dispatch(deleteUserSuccess());
    } catch (err) {
      dispatch(deleteUserFail(err));
    }
  };
};

export const deleteUserStart = () => {
  return {
    type: actionTypes.DELETE_USER_START,
  };
};

export const deleteUserSuccess = () => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
  };
};

export const deleteUserFail = (error) => {
  return {
    type: actionTypes.DELETE_USER_FAIL,
    error: "Sorry, an error has occurred. IT has been notified.",
  };
};

export const deleteUserReset = () => {
  return {
    type: actionTypes.DELETE_USER_RESET,
  };
};
