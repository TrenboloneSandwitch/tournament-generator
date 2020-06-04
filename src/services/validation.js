import Joi from "joi-browser";
const schema = {
  name: Joi.string().min(3).required().label("Jmeno"),
  place: Joi.string().min(3).required().label("Misto"),
  date: Joi.string().min(3).required().label("Datum"),
  time: Joi.string()
    .regex(/^([0-9]{2})\:([0-9]{2})$/)
    .required()
    .label("Cas"),
  players: Joi.array().min(4).required().label("Hráči"),
};

export const validateProperty = (name, value) => {
  const obj = { [name]: value };
  const schema_n = { [name]: schema[name] };
  const { error } = Joi.validate(obj, schema_n);
  console.log(name, value);

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
