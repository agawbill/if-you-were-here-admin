import * as actionTypes from "./actionTypes";

export const addResource = (dataToSend) => {
  return async (dispatch) => {
    try {
      dispatch(addResourceStart());
      const response = await fetch(`/api/resources`, {
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
      dispatch(addResourceSuccess());
    } catch (err) {
      dispatch(addResourceFail(err));
    }
  };
};

export const addResourceStart = () => {
  return {
    type: actionTypes.ADD_RESOURCE_START,
  };
};

export const addResourceSuccess = () => {
  return {
    type: actionTypes.ADD_RESOURCE_SUCCESS,
  };
};

export const addResourceFail = (error) => {
  return {
    type: actionTypes.ADD_RESOURCE_FAIL,
    error: "Sorry, an error has occurred. IT has been notified.",
  };
};

export const addResourceReset = () => {
  return {
    type: actionTypes.ADD_RESOURCE_RESET,
  };
};
