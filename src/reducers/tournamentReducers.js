import { reducerVars } from "../config";

export const tournamentReducer = (state, action) => {
  if ((action.type = reducerVars.CHANGE_ONE)) {
    const { name, value } = action.payload;
    const data = state.data;
    data[name] = value;

    return { data };
  }

  return state;
};
