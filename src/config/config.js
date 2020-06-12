import Joi from "joi-browser";

export const reducerVars = {
  CHANGE_ONE: "CHANGE_ONE",
  SET_ERROR: "SET_ERROR",
  HANDLE_ERRORS: "HANDLE_ERRORS",
  ADD_ARRAY_ITEM: "ADD_ARRAY_ITEM",
  DELETE_ARRAY_ITEM: "DELETE_ARRAY_ITEM",
  //
  SORT_TABLE: "SORT_TABLE",
  LOADING: "LOADING",
  RESPONSE_COMPLETE: "RESPONSE_COMPLETE",
  ERROR: "ERROR",
};

export const schema = {
  name: Joi.string().min(3).required().label("Jmeno"),
  place: Joi.string().min(3).required().label("Misto"),
  date: Joi.string().min(3).required().label("Datum"),
  type: Joi.object().required().label("Typ turnaje"),
  time: Joi.string()
    .regex(/^([0-9]{2})\:([0-9]{2})$/)
    .required()
    .label("Cas"),
  players: Joi.array().min(4).required().label("Hráči"),
  teams: Joi.array().min(4).required().label("Týmy"),
};
