import React, { useEffect, useCallback } from "react";
import { reducerVars } from "../config/config";
import { tableReducer } from "../reducers/tableReducers";
import firebase from "../services/firebase";
import { useThunkReducer } from "../hooks/useThunkReducer";

export const TableContext = React.createContext();
TableContext.displayName = "TableContext";
const {
  SORT_TABLE,
  ERROR,
  RESPONSE_COMPLETE,
  LOADING,
  ON_DELETE,
} = reducerVars;

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
  currentTournament: {},
};

export const TableProvider = ({ children }) => {
  const [state, dispatch] = useThunkReducer(tableReducer, initialState);
  const { data } = state;

  useEffect(() => {
    dispatch(fetchData);
  }, [dispatch]);

  const setCurrentTournament = useCallback(
    (id) => {
      console.log(id);
    },
    [dispatch]
  );

  const onSort = useCallback(
    (path) => {
      dispatch({
        type: SORT_TABLE,
        payload: { path },
      });
    },
    [dispatch]
  );
  const onDelete = useCallback(
    (id) => {
      const oldData = data;
      firebase
        .remove("tournaments", id)
        .then(() => {
          dispatch({ type: ON_DELETE, payload: { id } });
        })
        .catch(() =>
          dispatch({ type: RESPONSE_COMPLETE, payload: { data: oldData } })
        );
    },
    [dispatch]
  );

  const value = {
    state,
    onSort,
    onDelete,
    setCurrentTournament,
  };

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};
