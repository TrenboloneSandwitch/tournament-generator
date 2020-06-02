import React, { useReducer } from "react";
import { reducerVars } from "../config";
import { tournamentReducer } from "../reducers/tournamentReducers";
import { validateProperty, validate } from "../services/validation";

export const TournamentContext = React.createContext();
TournamentContext.displayName = "TournamentContext";
const { CHANGE_ONE, SET_ERROR, SUBMIT_FORM } = reducerVars;

const initialState = {
  data: { name: "", place: "", date: "", time: "" },
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

  const setError = (name, error) => {
    dispatch({
      type: SET_ERROR,
      payload: { name, error },
    });
  };

  const submitForm = () => {
    const errors = validate(state.data);
    dispatch({
      type: SUBMIT_FORM,
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

  const value = { handleSingleInput, submitForm, state };

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
};
