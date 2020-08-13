import * as actionTypes from "../actions/actionTypes";

const initialState = {
  approvedMessages: [],
  pendingMessages: [],
  filteredApproved: [],
  filteredPending: [],
  sort: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MESSAGES_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_MESSAGES_SUCCESS:
      const approvedMessages = action.messages.filter(
        (message) => message.approved === true
      );
      const pendingMessages = action.messages.filter(
        (message) => message.approved === false
      );
      return {
        ...state,
        approvedMessages,
        pendingMessages,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_MESSAGES_FAIL:
      return {
        ...state,
        loading: false,
        error: `${action.error}`,
      };
    case actionTypes.RESET_MESSAGES:
      return {
        loading: false,
        error: null,
      };

    //filter & sort logic for all messages below-- has to be in this reducer as it needs to be in same scope as messages
    //approved
    case actionTypes.SORT_APPROVED_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.SORT_APPROVED_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.SORT_APPROVED_ADD:
      return {
        ...state,
        sort: action.filter,
      };
    case actionTypes.SORT_APPROVED_REMOVE:
      return {
        ...state,
        sort: false,
        filteredApproved: [],
      };
    case actionTypes.SORT_APPROVED:
      const filteredCopy = [...state.approvedMessages];
      const sortedMessages =
        state.sort === "Oldest"
          ? filteredCopy.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            )
          : filteredCopy.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
      return {
        ...state,
        filteredApproved: state.sort ? [...sortedMessages] : [],
        loading: false,
        error: null,
      };
    //pending
    case actionTypes.SORT_PENDING_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.SORT_PENDING_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.SORT_PENDING_ADD:
      return {
        ...state,
        sort: action.filter,
      };
    case actionTypes.SORT_PENDING_REMOVE:
      return {
        ...state,
        sort: false,
        //this is incomplete, but the solution fits the state of the application presently
        filteredPending: [],
      };
    case actionTypes.SORT_PENDING:
      const filteredPendingCopy = [...state.pendingMessages];
      let sortedPendingMessages = null;
      if (state.sort === "Oldest") {
        sortedPendingMessages = filteredPendingCopy.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      } else if (state.sort === "Flagged") {
        sortedPendingMessages = filteredPendingCopy.sort((a, b) => {
          if (a.flagged && !b.flagged) {
            return -1;
          }
          if (!a.flagged && b.flagged) {
            return 1;
          }
          return 0;
        });
      } else {
        sortedPendingMessages = filteredPendingCopy.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }
      return {
        ...state,
        filteredPending: state.sort ? [...sortedPendingMessages] : [],
        loading: false,
        error: null,
      };

    case actionTypes.SORT_RESET:
      return {
        ...state,
        filteredPending: [],
        filteredApproved: [],
        sort: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
