import * as actionTypes from "./actionTypes";

export const editPersonOrder = (dataToSend) => {
  const { id } = dataToSend;

  return async (dispatch) => {
    try {
      dispatch(editPersonOrderStart());
      const response = await fetch(`/api/persons/${id}`, {
        method: "PATCH",
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
      dispatch(editPersonOrderSuccess());
    } catch (err) {
      dispatch(editPersonOrderFail(err));
    }
  };
};
export const editPersonOrderStart = () => {
  return {
    type: actionTypes.ORDER_PERSON_START,
  };
};

export const editPersonOrderSuccess = () => {
  return {
    type: actionTypes.ORDER_PERSON_SUCCESS,
  };
};

export const editPersonOrderFail = () => {
  return {
    type: actionTypes.ORDER_PERSON_FAIL,
    error: "Sorry, an error has occurred. IT has been notified.",
  };
};
