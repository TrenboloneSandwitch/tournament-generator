import { reducerVars } from "../config";
const {
  CHANGE_ONE,
  SET_ERROR,
  HANDLE_ERRORS,
  ADD_ARRAY_ITEM,
  DELETE_ARRAY_ITEM,
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
  if (action.type === ADD_ARRAY_ITEM) {
    const { subjectItem, arrName } = action.payload;
    const newArray = [...state.data[arrName], subjectItem];
    const data = { ...state.data, [arrName]: newArray };

    return { ...state, data };
  }
  if (action.type === DELETE_ARRAY_ITEM) {
    const { subjectItem, arrName } = action.payload;

    const newArray = state.data[arrName].filter((item) => item !== subjectItem);
    const data = { ...state.data, [arrName]: newArray };

    return { ...state, data };
  }

  return state;
};
