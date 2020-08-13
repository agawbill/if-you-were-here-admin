import * as actionTypes from "./actionTypes";

export const approveMessage = (data) => {
  const { id, user, token } = data;
  console.log(data);

  const body = { approved: true, flagged: false, approvedBy: user.id, token };
  return async (dispatch) => {
    try {
      dispatch(approveMessageStart());
      const response = await fetch(`/api/messages/${id}`, {
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
      dispatch(approveMessageSuccess(data.data));
    } catch (err) {
      dispatch(approveMessageFail(err));
    }
  };
};
export const approveMessageStart = () => {
  return {
    type: actionTypes.APPROVE_MESSAGE_START,
  };
};

export const approveMessageSuccess = (message) => {
  return {
    type: actionTypes.APPROVE_MESSAGE_SUCCESS,
    message,
  };
};

export const approveMessageFail = () => {
  return {
    type: actionTypes.APPROVE_MESSAGE_FAIL,
    error: "Sorry, an error has occurred. IT has been notified.",
  };
};

export const approveMessageReset = () => {
  return {
    type: actionTypes.APPROVE_MESSAGE_RESET,
  };
};
