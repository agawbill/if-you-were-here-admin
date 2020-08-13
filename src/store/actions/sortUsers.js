import * as actionTypes from "./actionTypes";

export const addSortUsersRegistered = (filter) => {
  return (dispatch) => {
    try {
      dispatch(sortUsersRegisteredStart());
      dispatch(sortUsersRegisteredAdd(filter));
      dispatch(sortUsersRegistered());
    } catch (err) {
      dispatch(sortUsersRegisteredFail(err));
    }
  };
};

export const removeSortUsersRegistered = (filter) => {
  return (dispatch) => {
    try {
      dispatch(sortUsersRegisteredStart());
      dispatch(sortUsersRegisteredRemove(filter));
      dispatch(sortUsersRegistered());
    } catch (err) {
      dispatch(sortUsersRegisteredFail(err));
    }
  };
};

export const sortUsersRegisteredAdd = (filter) => {
  return {
    type: actionTypes.SORT_USERS_REGISTERED_ADD,
    filter,
  };
};

export const sortUsersRegisteredRemove = (filter) => {
  return {
    type: actionTypes.SORT_USERS_REGISTERED_REMOVE,
    filter,
  };
};

export const sortUsersRegistered = () => {
  return {
    type: actionTypes.SORT_USERS_REGISTERED,
  };
};

export const sortUsersRegisteredStart = () => {
  return {
    type: actionTypes.SORT_USERS_REGISTERED_START,
  };
};

export const sortUsersRegisteredFail = (error) => {
  return {
    type: actionTypes.SORT_USERS_REGISTERED_FAIL,
    error,
  };
};

export const addSortUsersPending = (filter) => {
  return (dispatch) => {
    try {
      dispatch(sortUsersPendingStart());
      dispatch(sortUsersPendingAdd(filter));
      dispatch(sortUsersPending());
    } catch (err) {
      dispatch(sortUsersPendingFail(err));
    }
  };
};

export const removeSortUsersPending = (filter) => {
  return (dispatch) => {
    try {
      dispatch(sortUsersPendingStart());
      dispatch(sortUsersPendingRemove(filter));
      dispatch(sortUsersPending());
    } catch (err) {
      dispatch(sortUsersPendingFail(err));
    }
  };
};

export const sortUsersPendingAdd = (filter) => {
  return {
    type: actionTypes.SORT_USERS_PENDING_ADD,
    filter,
  };
};

export const sortUsersPendingRemove = (filter) => {
  return {
    type: actionTypes.SORT_USERS_PENDING_REMOVE,
    filter,
  };
};

export const sortUsersPending = () => {
  return {
    type: actionTypes.SORT_USERS_PENDING,
  };
};

export const sortUsersPendingStart = () => {
  return {
    type: actionTypes.SORT_USERS_PENDING_START,
  };
};

export const sortUsersPendingFail = (error) => {
  return {
    type: actionTypes.SORT_USERS_PENDING_FAIL,
    error,
  };
};

export const sortUsersReset = () => {
  return {
    type: actionTypes.SORT_USERS_RESET,
  };
};
