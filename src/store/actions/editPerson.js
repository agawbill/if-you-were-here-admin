import * as actionTypes from "./actionTypes";

export const editPerson = (dataToSend) => {
  const { id } = dataToSend;
  return async (dispatch) => {
    try {
      dispatch(editPersonStart());
      const response = await fetch(`/api/persons/${id}`, {
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

      dispatch(editPersonSuccess(data.data));
    } catch (err) {
      dispatch(editPersonFail(err));
    }
  };
};

export const editPersonStart = () => {
  return {
    type: actionTypes.EDIT_PERSON_START,
  };
};

export const editPersonSuccess = (person) => {
  return {
    type: actionTypes.EDIT_PERSON_SUCCESS,
    person,
  };
};

export const editPersonFail = () => {
  return {
    type: actionTypes.EDIT_PERSON_FAIL,
    error: "Sorry, an error has occurred. IT has been notified.",
  };
};

export const editPersonReset = () => {
  return {
    type: actionTypes.EDIT_PERSON_RESET,
  };
};
