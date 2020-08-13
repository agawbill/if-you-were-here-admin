import * as actionTypes from "./actionTypes";

export const fetchMessage = (messageId) => {
  return async (dispatch) => {
    try {
      dispatch(fetchMessageStart());
      const response = await fetch(`/api/messages/${messageId}`, {
        method: "GET",
        mode: "cors",
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
      dispatch(fetchMessageSuccess(data.data));
    } catch (err) {
      dispatch(fetchMessageFail(err));
    }
  };
};

export const fetchMessageStart = () => {
  return {
    type: actionTypes.FETCH_MESSAGE_START,
  };
};

export const fetchMessageSuccess = (message) => {
  return {
    type: actionTypes.FETCH_MESSAGE_SUCCESS,
    message,
  };
};

export const fetchMessageFail = (error) => {
  return {
    type: actionTypes.FETCH_MESSAGE_FAIL,
    error,
  };
};

export const resetMessage = () => {
  return {
    type: actionTypes.RESET_MESSAGE,
  };
};
