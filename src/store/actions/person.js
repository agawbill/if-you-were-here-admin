import * as actionTypes from "./actionTypes";

export const getPerson = (id) => {
  return async (dispatch) => {
    try {
      await dispatch(getPersonStart());
      const response = await fetch(`/api/persons/${id}`, {
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
      await dispatch(getPersonSuccess(data.data));
    } catch (err) {
      await dispatch(getPersonFail(err));
    }
  };
};

export const getPersonStart = () => {
  return {
    type: actionTypes.GET_PERSON_START,
  };
};

export const getPersonSuccess = (person) => {
  return {
    type: actionTypes.GET_PERSON_SUCCESS,
    person,
  };
};

export const getPersonFail = (error) => {
  return {
    type: actionTypes.GET_PERSON_FAIL,
    error: error.message,
  };
};

export const getPersonReset = () => {
  return {
    type: actionTypes.GET_PERSON_RESET,
  };
};
