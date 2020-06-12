import { reducerVars } from "../config/config";
const { SORT_TABLE, ERROR, RESPONSE_COMPLETE, LOADING } = reducerVars;

export const tableReducer = (state, action) => {
  if (action.type === SORT_TABLE) {
    const sortColumn = state.sortColumn;
    if (sortColumn.path === action.payload.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = action.payload.path;
      sortColumn.order = "asc";
    }

    return { ...state, sortColumn };
  }

  if (action.type === LOADING) {
    return {
      ...state,
      data: null,
      loading: true,
      error: null,
    };
  }
  if (action.type === RESPONSE_COMPLETE) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
      error: null,
    };
  }
  if (action.type === ERROR) {
    return {
      ...state,
      data: null,
      loading: false,
      error: action.payload.error,
    };
  }
  return state;
};
