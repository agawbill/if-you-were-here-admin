import * as actionTypes from "./actionTypes";

export const deleteMessage = (id, token) => {
  return async (dispatch) => {
    try {
      dispatch(deleteMessageStart());
      const response = await fetch(`/api/messages/${id}`, {
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
      dispatch(deleteMessageSuccess());
    } catch (err) {
      dispatch(deleteMessageFail(err));
    }
  };
};

export const deleteMessageStart = () => {
  return {
    type: actionTypes.DELETE_MESSAGE_START,
  };
};

export const deleteMessageSuccess = () => {
  return {
    type: actionTypes.DELETE_MESSAGE_SUCCESS,
  };
};

export const deleteMessageFail = (error) => {
  return {
    type: actionTypes.DELETE_MESSAGE_FAIL,
    error: "Sorry, an error has occurred. IT has been notified.",
  };
};

export const deleteMessageReset = () => {
  return {
    type: actionTypes.DELETE_MESSAGE_RESET,
  };
};
