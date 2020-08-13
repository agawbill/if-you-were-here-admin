import * as actionTypes from "./actionTypes";

export const deleteResource = (id, token) => {
  return async (dispatch) => {
    try {
      dispatch(deleteResourceStart());
      const response = await fetch(`/api/resources/${id}`, {
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
      dispatch(deleteResourceSuccess());
    } catch (err) {
      dispatch(deleteResourceFail(err));
    }
  };
};

export const deleteResourceStart = () => {
  return {
    type: actionTypes.DELETE_RESOURCE_START,
  };
};

export const deleteResourceSuccess = () => {
  return {
    type: actionTypes.DELETE_RESOURCE_SUCCESS,
  };
};

export const deleteResourceFail = (error) => {
  return {
    type: actionTypes.DELETE_RESOURCE_FAIL,
    error: "Sorry, an error has occurred. IT has been notified.",
  };
};

export const deleteResourceReset = () => {
  return {
    type: actionTypes.DELETE_RESOURCE_RESET,
  };
};
