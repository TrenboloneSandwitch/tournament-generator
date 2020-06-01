import React, { useReducer } from "react";
import { reducerVars } from "../config";
import { tournamentReducer } from "../reducers/tournamentReducers";

export const TournamentContext = React.createContext();
TournamentContext.displayName = "TournamentContext";
const { CHANGE_ONE } = reducerVars;

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

  const value = { changeOne, state };

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
};
