import Joi from "joi-browser";
import { schema } from "../config/config";

export const validateProperty = (name, value) => {
  const obj = { [name]: value };
  const schema_n = { [name]: schema[name] };
  const { error } = Joi.validate(obj, schema_n);
  return error ? error.details[0].message : null;
};

export const validate = (data) => {
  const options = { abortEarly: false };
  const { error } = Joi.validate(data, schema, options);
  if (!error) return null;

  const errors = {};
  for (let item of error.details) errors[item.path[0]] = item.message;
  return errors;
};
