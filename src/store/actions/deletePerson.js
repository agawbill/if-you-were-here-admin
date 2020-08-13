import * as actionTypes from "./actionTypes";

export const deletePerson = (id, token) => {
  return async (dispatch) => {
    try {
      dispatch(deletePersonStart());
      const response = await fetch(`/api/persons/${id}`, {
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
      dispatch(deletePersonSuccess());
    } catch (err) {
      dispatch(deletePersonFail(err));
    }
  };
};

export const deletePersonStart = () => {
  return {
    type: actionTypes.DELETE_PERSON_START,
  };
};

export const deletePersonSuccess = () => {
  return {
    type: actionTypes.DELETE_PERSON_SUCCESS,
  };
};

export const deletePersonFail = (error) => {
  return {
    type: actionTypes.DELETE_PERSON_FAIL,
    error: "Sorry, an error has occurred. IT has been notified.",
  };
};

export const deletePersonReset = () => {
  return {
    type: actionTypes.DELETE_PERSON_RESET,
  };
};
