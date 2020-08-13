import * as actionTypes from "./actionTypes";

export const getResources = () => {
  return async (dispatch) => {
    try {
      await dispatch(getResourcesStart());
      const response = await fetch("/api/resources", {
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
      await dispatch(getResourcesSuccess(data.data));
    } catch (err) {
      await dispatch(getResourcesFail(err));
    }
  };
};

export const getResourcesStart = () => {
  return {
    type: actionTypes.GET_RESOURCES_START,
  };
};

export const getResourcesSuccess = (resources) => {
  return {
    type: actionTypes.GET_RESOURCES_SUCCESS,
    resources,
  };
};

export const getResourcesFail = (error) => {
  return {
    type: actionTypes.GET_RESOURCES_FAIL,
    error: error.message,
  };
};

export const getResourcesReset = () => {
  return {
    type: actionTypes.GET_RESOURCES_RESET,
  };
};
