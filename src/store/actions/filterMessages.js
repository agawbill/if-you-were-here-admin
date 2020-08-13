import * as actionTypes from "./actionTypes";
import { sortPending } from "./index";

export const addFilter = (filter, filtered, sort) => {
  return async (dispatch) => {
    try {
      await dispatch(filterMessagesStart());
      await dispatch(filterMessagesAdd());
      await dispatch(filterMessages(filter));
      if (sort) {
        await dispatch(sortPending(filtered));
      }
    } catch (err) {
      dispatch(filterMessagesFail(err));
    }
  };
};

export const removeFilter = (filter, filtered, sort) => {
  return (dispatch) => {
    try {
      await dispatch(filterMessagesStart());
      await dispatch(filterMessagesRemove());
      await dispatch(filterMessages(filter));
      if (sort) {
        dispatch(sortPending(filtered));
      }
    } catch (err) {
      dispatch(filterMessagesFail(err));
    }
  };
};

export const filterMessagesAdd = () => {
  return {
    type: actionTypes.FILTER_MESSAGES_ADD,
  };
};

export const filterMessagesRemove = () => {
  return {
    type: actionTypes.FILTER_MESSAGES_REMOVE,
  };
};

export const filterMessages = (filter) => {
  return {
    type: actionTypes.FILTER_MESSAGES,
    filter,
  };
};

export const filterMessagesStart = () => {
  return {
    type: actionTypes.FILTER_MESSAGES_START,
  };
};

export const filterMessagesFail = (error) => {
  return {
    type: actionTypes.FILTER_MESSAGES_FAIL,
    error,
  };
};

export const filterReset = () => {
  return {
    type: actionTypes.FILTER_RESET,
  };
};
