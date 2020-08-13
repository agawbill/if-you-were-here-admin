import * as actionTypes from "./actionTypes";

export const getResource = (id) => {
  return async (dispatch) => {
    try {
      await dispatch(getResourceStart());
      const response = await fetch(`/api/resources/${id}`, {
        method: "GET",
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
      await dispatch(getResourceSuccess(data.data));
    } catch (err) {
      await dispatch(getResourceFail(err));
    }
  };
};

export const getResourceStart = () => {
  return {
    type: actionTypes.GET_RESOURCE_START,
  };
};

export const getResourceSuccess = (resource) => {
  return {
    type: actionTypes.GET_RESOURCE_SUCCESS,
    resource,
  };
};

export const getResourceFail = (error) => {
  return {
    type: actionTypes.GET_RESOURCE_FAIL,
    error: error.message,
  };
};

export const getResourceReset = () => {
  return {
    type: actionTypes.GET_RESOURCE_RESET,
  };
};
