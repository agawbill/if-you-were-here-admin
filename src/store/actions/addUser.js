import * as actionTypes from "./actionTypes";

export const addUser = (dataToSend) => {
  return async (dispatch) => {
    try {
      dispatch(addUserStart());
      const response = await fetch(`/api/users`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      const data = await response.json();

      if (data.success === false) {
        throw new Error("Bad request.");
      }
      dispatch(addUserSuccess());
    } catch (err) {
      dispatch(addUserFail(err));
    }
  };
};

export const addUserStart = () => {
  return {
    type: actionTypes.ADD_USER_START,
  };
};

export const addUserSuccess = () => {
  return {
    type: actionTypes.ADD_USER_SUCCESS,
  };
};

export const addUserFail = () => {
  return {
    type: actionTypes.ADD_USER_FAIL,
    error: "Sorry, an error has occurred. IT has been notified.",
  };
};

export const addUserReset = () => {
  return {
    type: actionTypes.ADD_USER_RESET,
  };
};
