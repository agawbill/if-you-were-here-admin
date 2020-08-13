import * as actionTypes from "./actionTypes";

export const toggleNotification = (data) => {
  const { id, notifications, token } = data;
  const body = { notifications, token };
  return async (dispatch) => {
    try {
      dispatch(toggleNotificationStart());
      const response = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.success === false) {
        throw new Error("Bad request.");
      }
      dispatch(toggleNotificationSuccess(data.data));
    } catch (err) {
      dispatch(toggleNotificationFail(err));
    }
  };
};
export const toggleNotificationStart = () => {
  return {
    type: actionTypes.TOGGLE_NOTIFICATION_START,
  };
};

export const toggleNotificationSuccess = (user) => {
  return {
    type: actionTypes.TOGGLE_NOTIFICATION_SUCCESS,
    user,
  };
};

export const toggleNotificationFail = () => {
  return {
    type: actionTypes.TOGGLE_NOTIFICATION_FAIL,
    error: "Sorry, an error has occurred. IT has been notified.",
  };
};

export const toggleNotificationReset = () => {
  return {
    type: actionTypes.TOGGLE_NOTIFICATION_RESET,
  };
};
