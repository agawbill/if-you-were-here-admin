import * as actionTypes from "./actionTypes";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const auth = () => {
  return async (dispatch) => {
    try {
      const token = cookies.get("jwt") || localStorage.getItem("token");
      if (token) {
        dispatch(checkAuth(token));
      } else {
        dispatch(logout());
      }
    } catch (err) {}
  };
};

export const checkAuth = (token) => {
  return async (dispatch) => {
    const user = localStorage.getItem("user");
    const expirationDate = localStorage.getItem("expirationDate")
      ? new Date(localStorage.getItem("expirationDate"))
      : null;
    if (expirationDate && expirationDate <= new Date()) {
      return dispatch(logout());
    }
    try {
      const response = await fetch("/api/auth/verify-token", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (data.success) {
        const { exp } = jwt_decode(token);
        const expiration = new Date(new Date().getTime() + exp);
        const newUser = `${data.data.user._id}-${data.data.user.firstName} ${data.data.user.lastName}-${data.data.user.email}-${data.data.user.role}-${data.data.user.notifications}`;
        if (!user && !expirationDate) {
          localStorage.setItem("token", token);
          localStorage.setItem("expirationDate", expiration);
          localStorage.setItem("user", newUser);
          dispatch(checkAuthSuccess(newUser, expiration, token));
          dispatch(checkAuthTimeout(exp));
        } else {
          dispatch(checkAuthSuccess(newUser, expirationDate, token));
          const today = new Date().getTime();
          const dateExpires = new Date(expirationDate).getTime();
          dispatch(checkAuthTimeout(dateExpires - today));
        }
      } else {
        dispatch(checkAuthFail(null));
      }
    } catch (err) {
      dispatch(checkAuthFail(err));
    }
  };
};

export const checkAuthSuccess = (user, expiration, token) => {
  return {
    type: actionTypes.CHECK_AUTH_SUCCESS,
    user,
    expiration,
    token,
  };
};

export const checkAuthFail = (error) => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  cookies.remove("jwt");
  return {
    type: actionTypes.CHECK_AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  cookies.remove("jwt");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};
