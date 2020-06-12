import React, { useEffect, useCallback } from "react";
import { reducerVars } from "../config/config";
import { tableReducer } from "../reducers/tableReducers";
import firebase from "../services/firebase";
import { useThunkReducer } from "../hooks/useThunkReducer";

export const TableContext = React.createContext();
TableContext.displayName = "TableContext";
const { SORT_TABLE, ERROR, RESPONSE_COMPLETE, LOADING } = reducerVars;

const fetchData = (dispatch) => {
  dispatch({ type: LOADING });
  firebase
    .get("tournaments")
    .then((data) => {
      const tableData = data.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      dispatch({ type: RESPONSE_COMPLETE, payload: { data: tableData } });
    })
    .catch((error) => dispatch({ type: ERROR, payload: { error } }));
};

const initialState = {
  data: [],
  sortColumn: {
    path: "date",
    order: "desc",
  },
};

export const TableProvider = ({ children }) => {
  const [state, dispatch] = useThunkReducer(tableReducer, initialState);
  const { data } = state;

  useEffect(() => {
    dispatch(fetchData);
  }, [dispatch]);

  const onSort = useCallback(
    (path) => {
      dispatch({
        type: SORT_TABLE,
        payload: { path },
      });
    },
    [dispatch]
  );

  const value = {
    state,
    onSort,
  };

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};
