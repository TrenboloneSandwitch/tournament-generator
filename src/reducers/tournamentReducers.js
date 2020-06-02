import { reducerVars } from "../config";
const { CHANGE_ONE, SET_ERROR, SUBMIT_FORM } = reducerVars;

export const tournamentReducer = (state, action) => {
  if (action.type === CHANGE_ONE) {
    const { name, value } = action.payload;
    const data = state.data;
    data[name] = value;

    return { ...state, data };
  }
  if (action.type === SET_ERROR) {
    const { name, error } = action.payload;
    const errors = state.errors;

    if (error) errors[name] = error;
    else delete errors[name];

    return { ...state, errors };
  }
  if (action.type === SUBMIT_FORM) {
    const errors = action.payload.errors;
    console.log(errors);

    return { ...state, errors: errors || {} };
  }

  return state;
};
