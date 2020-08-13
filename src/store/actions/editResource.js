import * as actionTypes from "./actionTypes";

export const editResource = (dataToSend) => {
  const { id } = dataToSend;
  return async (dispatch) => {
    try {
      dispatch(editResourceStart());
      const response = await fetch(`/api/resources/${id}`, {
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
      dispatch(editResourceSuccess(data.data));
    } catch (err) {
      dispatch(editResourceFail(err));
    }
  };
};

export const editResourceStart = () => {
  return {
    type: actionTypes.EDIT_RESOURCE_START,
  };
};

export const editResourceSuccess = (resource) => {
  return {
    type: actionTypes.EDIT_RESOURCE_SUCCESS,
    resource,
  };
};

export const editResourceFail = (error) => {
  return {
    type: actionTypes.EDIT_RESOURCE_FAIL,
    error: "Sorry, an error has occurred. IT has been notified.",
  };
};

export const editResourceReset = () => {
  return {
    type: actionTypes.EDIT_RESOURCE_RESET,
  };
};
