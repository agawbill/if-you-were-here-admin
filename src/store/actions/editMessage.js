import * as actionTypes from "./actionTypes";

export const editMessage = (dataToSend) => {
  const { id } = dataToSend;
  return async (dispatch) => {
    try {
      dispatch(editMessageStart());
      const response = await fetch(`/api/messages/${id}`, {
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
      dispatch(editMessageSuccess(data.data));
    } catch (err) {
      dispatch(editMessageFail(err));
    }
  };
};

export const editMessageStart = () => {
  return {
    type: actionTypes.EDIT_MESSAGE_START,
  };
};

export const editMessageSuccess = (message) => {
  return {
    type: actionTypes.EDIT_MESSAGE_SUCCESS,
    message,
  };
};

export const editMessageFail = () => {
  return {
    type: actionTypes.EDIT_MESSAGE_FAIL,
    error: "Sorry, an error has occurred. IT has been notified.",
  };
};

export const editMessageReset = () => {
  return {
    type: actionTypes.EDIT_MESSAGE_RESET,
  };
};
