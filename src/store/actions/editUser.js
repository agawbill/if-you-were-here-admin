import * as actionTypes from "./actionTypes";

export const editUser = (dataToSend) => {
  const { id } = dataToSend;
  return async (dispatch) => {
    try {
      dispatch(editUserStart());
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
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
      dispatch(editUserSuccess(data.data));
    } catch (err) {
      dispatch(editUserFail(err));
    }
  };
};

export const editUserStart = () => {
  return {
    type: actionTypes.EDIT_USER_START,
  };
};

export const editUserSuccess = (user) => {
  return {
    type: actionTypes.EDIT_USER_SUCCESS,
    user,
  };
};

export const editUserFail = () => {
  return {
    type: actionTypes.EDIT_USER_FAIL,
    error: "Sorry, an error has occurred. IT has been notified.",
  };
};

export const editUserReset = () => {
  return {
    type: actionTypes.EDIT_USER_RESET,
  };
};
