import * as actionTypes from "./actionTypes";

export const submitMessage = (message) => {
  return async (dispatch) => {
    try {
      dispatch(submitMessageStart());
      const response = await fetch("/api/messages", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      const data = await response.json();
      dispatch(submitMessageSuccess(data));
    } catch (err) {
      dispatch(submitMessageFail(err));
    }
  };
};

export const submitMessageStart = () => {
  return {
    type: actionTypes.SUBMIT_MESSAGE_START,
  };
};

export const submitMessageSuccess = (message) => {
  return {
    type: actionTypes.SUBMIT_MESSAGE_SUCCESS,
    message,
  };
};

export const submitMessageFail = (error) => {
  return {
    type: actionTypes.SUBMIT_MESSAGE_FAIL,
    error: error.message,
  };
};

export const submitMessageReset = () => {
  return {
    type: actionTypes.SUBMIT_MESSAGE_RESET,
  };
};
