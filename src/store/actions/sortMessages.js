import * as actionTypes from "./actionTypes";

export const addSortApproved = (filter) => {
  return (dispatch) => {
    try {
      dispatch(sortApprovedStart());
      dispatch(sortApprovedAdd(filter));
      dispatch(sortApproved());
    } catch (err) {
      dispatch(sortApprovedFail(err));
    }
  };
};

export const removeSortApproved = (filter) => {
  return (dispatch) => {
    try {
      dispatch(sortApprovedStart());
      dispatch(sortApprovedRemove(filter));
    } catch (err) {
      dispatch(sortApprovedFail(err));
    }
  };
};

export const sortApprovedAdd = (filter) => {
  return {
    type: actionTypes.SORT_APPROVED_ADD,
    filter,
  };
};

export const sortApprovedRemove = (filter) => {
  return {
    type: actionTypes.SORT_APPROVED_REMOVE,
    filter,
  };
};

export const sortApproved = () => {
  return {
    type: actionTypes.SORT_APPROVED,
  };
};

export const sortApprovedStart = () => {
  return {
    type: actionTypes.SORT_APPROVED_START,
  };
};

export const sortApprovedFail = (error) => {
  return {
    type: actionTypes.SORT_APPROVED_FAIL,
    error,
  };
};

export const addSortPending = (filter) => {
  return (dispatch) => {
    try {
      dispatch(sortPendingStart());
      dispatch(sortPendingAdd(filter));
      dispatch(sortPending());
    } catch (err) {
      dispatch(sortPendingFail(err));
    }
  };
};

export const removeSortPending = (filter) => {
  return (dispatch) => {
    try {
      dispatch(sortPendingStart());
      dispatch(sortPendingRemove(filter));
    } catch (err) {
      dispatch(sortPendingFail(err));
    }
  };
};

export const sortPendingAdd = (filter) => {
  return {
    type: actionTypes.SORT_PENDING_ADD,
    filter,
  };
};

export const sortPendingRemove = (filter) => {
  return {
    type: actionTypes.SORT_PENDING_REMOVE,
    filter,
  };
};

export const sortPending = () => {
  return {
    type: actionTypes.SORT_PENDING,
  };
};

export const sortPendingStart = () => {
  return {
    type: actionTypes.SORT_PENDING_START,
  };
};

export const sortPendingFail = (error) => {
  return {
    type: actionTypes.SORT_PENDING_FAIL,
    error,
  };
};

export const sortReset = () => {
  return {
    type: actionTypes.SORT_RESET,
  };
};
