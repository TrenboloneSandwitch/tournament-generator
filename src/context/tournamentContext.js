import React, { useReducer } from "react";
import { reducerVars } from "../config";
import { tournamentReducer } from "../reducers/tournamentReducers";
import { validateProperty, validate } from "../services/validation";

export const TournamentContext = React.createContext();
TournamentContext.displayName = "TournamentContext";
const {
  CHANGE_ONE,
  SET_ERROR,
  HANDLE_ERRORS,
  ADD_TAG,
  DELETE_TAG,
} = reducerVars;

const initialState = {
  data: { name: "", place: "", date: "", time: "", players: [] },
  errors: {},
};

export const TournamentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tournamentReducer, initialState);

  const changeOne = (name, value) => {
    dispatch({
      type: CHANGE_ONE,
      payload: { name, value },
    });
  };

  const addTag = (player) => {
    dispatch({
      type: ADD_TAG,
      payload: { player },
    });
  };
  const deleteTag = (player) => {
    dispatch({
      type: DELETE_TAG,
      payload: { player },
    });
  };

  const setError = (name, error) => {
    dispatch({
      type: SET_ERROR,
      payload: { name, error },
    });
  };

  const submitForm = () => {
    const errors = validate(state.data);
    dispatch({
      type: HANDLE_ERRORS,
      payload: { errors },
    });
    if (errors) return;
    // insert in the DB
    console.log(state);
  };

  const handleSingleInput = (input) => {
    const errorMessage = validateProperty(input);
    const { name, value } = input;

    changeOne(name, value);
    setError(name, errorMessage);
  };

  const value = { handleSingleInput, submitForm, addTag, deleteTag, state };

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
};
