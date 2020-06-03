import { reducerVars } from "../config";
const {
  CHANGE_ONE,
  SET_ERROR,
  HANDLE_ERRORS,
  ADD_TAG,
  DELETE_TAG,
} = reducerVars;

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
  if (action.type === HANDLE_ERRORS) {
    const errors = action.payload.errors;

    return { ...state, errors: errors || {} };
  }
  if (action.type === ADD_TAG) {
    const players = [...state.data.players, action.payload.player];
    const data = { ...state.data, players };

    return { ...state, data };
  }
  if (action.type === DELETE_TAG) {
    /* const playerIndex = state.data.players.findIndex(
      (elName) => elName === action.payload.player
    );
    const players = state.data.players;
    players.splice(playerIndex, 1);
    const data = { ...state.data, players };

    return { ...state, data }; */
  }

  return state;
};
