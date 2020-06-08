import React, { useReducer, useCallback } from "react";
import { reducerVars } from "../config/config";
import { tournamentReducer } from "../reducers/tournamentReducers";
import { validateProperty, validate } from "../services/validation";

export const TournamentContext = React.createContext();
TournamentContext.displayName = "TournamentContext";
const {
  CHANGE_ONE,
  SET_ERROR,
  HANDLE_ERRORS,
  ADD_ARRAY_ITEM,
  DELETE_ARRAY_ITEM,
} = reducerVars;

const initialState = {
  data: {
    name: "",
    place: "",
    date: "",
    time: "",
    type: "",
    players: [],
    teams: [],
  },
  errors: {},
};

export const TournamentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tournamentReducer, initialState);

  const changeOne = useCallback(
    (name, value) => {
      dispatch({
        type: CHANGE_ONE,
        payload: { name, value },
      });
    },
    [dispatch]
  );

  const addArrayItem = useCallback(
    (subjectItem, arrName, value) => {
      dispatch({
        type: ADD_ARRAY_ITEM,
        payload: { subjectItem, arrName },
      });
    },
    [dispatch]
  );
  const deleteArrayItem = useCallback(
    (subjectItem, arrName, value) => {
      dispatch({
        type: DELETE_ARRAY_ITEM,
        payload: { subjectItem, arrName },
      });
    },
    [dispatch]
  );

  const setError = useCallback(
    (name, value) => {
      const error = validateProperty(name, value);
      dispatch({
        type: SET_ERROR,
        payload: { name, error },
      });
    },
    [dispatch]
  );

  const submitForm = useCallback(() => {
    const errors = validate(state.data);
    dispatch({
      type: HANDLE_ERRORS,
      payload: { errors },
    });
    if (errors) return;
    // insert in the DB
    console.log(state);
  }, [dispatch, state]);

  const handleSingleInput = (input) => {
    console.log(input);

    const { name, value } = input;

    changeOne(name, value);
    setError(name, value);
  };

  const value = {
    handleSingleInput,
    submitForm,
    addArrayItem,
    deleteArrayItem,
    setError,
    state,
  };

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
};
