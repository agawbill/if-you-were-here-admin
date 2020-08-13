import * as actionTypes from "../actions/actionTypes";

const initialState = {
  registeredUsers: [],
  pendingUsers: [],
  filteredRegistered: [],
  filteredPending: [],
  sort: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_USERS_SUCCESS:
      const registeredUsers = action.users.filter(
        (user) => user.providerId || user.password
      );
      const pendingUsers = action.users.filter((user) => !user.providerId);
      return {
        ...state,
        registeredUsers,
        pendingUsers,
        loading: false,
        error: null,
      };
    case actionTypes.GET_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: `${action.error}`,
      };
    case actionTypes.GET_USERS_RESET:
      return {
        loading: false,
        error: null,
      };

    //filter & sort logic for all users below-- has to be in this reducer as it needs to be in same scope as users
    //registered
    case actionTypes.SORT_USERS_REGISTERED_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.SORT_USERS_REGISTERED_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.SORT_USERS_REGISTERED_ADD:
      return {
        ...state,
        sort: action.filter,
      };
    case actionTypes.SORT_USERS_REGISTERED_REMOVE:
      return {
        ...state,
        sort: false,
      };
    case actionTypes.SORT_USERS_REGISTERED:
      const registeredUsersCopy = [...state.registeredUsers];
      let sortedRegistered = [...registeredUsersCopy];
      if (state.sort === "Email A-Z") {
        sortedRegistered = registeredUsersCopy.sort((a, b) => {
          if (a.email > b.email) return 1;
          if (a.email < b.email) return -1;
          return 0;
        });
      } else if (state.sort === "Email Z-A") {
        sortedRegistered = registeredUsersCopy.sort((a, b) => {
          if (a.email < b.email) return 1;
          if (a.email > b.email) return -1;
          return 0;
        });
      } else if (state.sort === "Last Name A-Z") {
        sortedRegistered = registeredUsersCopy.sort((a, b) => {
          if (a.lastName > b.lastName) return 1;
          if (a.lastName < b.lastName) return -1;
          return 0;
        });
      } else if (state.sort === "Last Name Z-A") {
        sortedRegistered = registeredUsersCopy.sort((a, b) => {
          if (a.lastName < b.lastName) return 1;
          if (a.lastName > b.lastName) return -1;
          return 0;
        });
      }
      return {
        ...state,
        filteredRegistered: state.sort ? [...sortedRegistered] : [],
        loading: false,
        error: null,
      };
    //pending
    case actionTypes.SORT_USERS_PENDING_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.SORT_USERS_PENDING_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.SORT_USERS_PENDING_ADD:
      return {
        ...state,
        sort: action.filter,
      };
    case actionTypes.SORT_USERS_PENDING_REMOVE:
      return {
        ...state,
        sort: false,
      };
    case actionTypes.SORT_USERS_PENDING:
      const pendingUsersCopy = [...state.pendingUsers];
      let sortedPending = [...pendingUsersCopy];
      if (state.sort === "Email A-Z") {
        sortedPending = pendingUsersCopy.sort((a, b) => {
          if (a.email > b.email) return 1;
          if (a.email < b.email) return -1;
          return 0;
        });
      } else if (state.sort === "Email Z-A") {
        sortedPending = pendingUsersCopy.sort((a, b) => {
          if (a.email < b.email) return 1;
          if (a.email > b.email) return -1;
          return 0;
        });
      } else if (state.sort === "Last Name A-Z") {
        sortedPending = pendingUsersCopy.sort((a, b) => {
          if (a.lastName > b.lastName) return 1;
          if (a.lastName < b.lastName) return -1;
          return 0;
        });
      } else if (state.sort === "Last Name Z-A") {
        sortedPending = pendingUsersCopy.sort((a, b) => {
          if (a.lastName < b.lastName) return 1;
          if (a.lastName > b.lastName) return -1;
          return 0;
        });
      }
      return {
        ...state,
        filteredPending: state.sort ? [...sortedPending] : [],
        loading: false,
        error: null,
      };

    case actionTypes.SORT_USERS_RESET:
      return {
        ...state,
        filteredPending: [],
        filteredRegistered: [],
        sort: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
