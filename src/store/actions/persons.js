import * as actionTypes from "./actionTypes";

export const getPersons = () => {
  return async (dispatch) => {
    try {
      await dispatch(getPersonsStart());
      const response = await fetch("/api/persons", {
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
      await dispatch(getPersonsSuccess(data.data));
    } catch (err) {
      await dispatch(getPersonsFail(err));
    }
  };
};

export const getPersonsStart = () => {
  return {
    type: actionTypes.GET_PERSONS_START,
  };
};

export const getPersonsSuccess = (persons) => {
  return {
    type: actionTypes.GET_PERSONS_SUCCESS,
    persons,
  };
};

export const getPersonsFail = (error) => {
  return {
    type: actionTypes.GET_PERSONS_FAIL,
    error: error.message,
  };
};

export const getPersonsReset = () => {
  return {
    type: actionTypes.GET_PERSONS_RESET,
  };
};
