import * as actionTypes from "./actionTypes";

export const addPerson = (dataToSend) => {
  return async (dispatch) => {
    try {
      dispatch(addPersonStart());
      const response = await fetch(`/api/persons`, {
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
      dispatch(addPersonSuccess());
    } catch (err) {
      dispatch(addPersonFail(err));
    }
  };
};

export const addPersonStart = () => {
  return {
    type: actionTypes.ADD_PERSON_START,
  };
};

export const addPersonSuccess = () => {
  return {
    type: actionTypes.ADD_PERSON_SUCCESS,
  };
};

export const addPersonFail = () => {
  return {
    type: actionTypes.ADD_PERSON_FAIL,
    error: "Sorry, an error has occurred. IT has been notified.",
  };
};

export const addPersonReset = () => {
  return {
    type: actionTypes.ADD_PERSON_RESET,
  };
};
