import React, { useState, useContext } from "react";
import Input from "./common/Input";
import Joi from "joi-browser";
import { TournamentContext } from "../context/tournamentContext";

const CreateTournament = () => {
  const [formState, setFormState] = useState({
    data: { name: "", place: "", date: "", time: "" },
    errors: {},
  });
  const { changeOne, state } = useContext(TournamentContext);
  const { data, errors } = state;

  const schema = {
    name: Joi.string().min(3).required().label("Jmeno"),
    place: Joi.string().min(3).required().label("Misto"),
    date: Joi.string().min(3).required().label("Datum"),
    time: Joi.string().required().label("Cas"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema_n = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schema_n);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }) => {
    const errors = { ...formState.errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const { name, value } = input;

    changeOne(name, value);

    // const data = { ...formState.data };
    // data[input.name] = input.value;
    // setFormState({ data, errors });
  };

  const doSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();

    setFormState({ ...formState, errors: errors || {} });

    if (errors) return;
    // insert in the DB
    console.log(formState);
  };

  return (
    <div className="form row container align-items-center justify-content-center">
      <form className="col-7 row" onSubmit={doSubmit}>
        {" "}
        <Input
          value={data["name"]}
          type="text"
          label="Název"
          name="name"
          col="12"
          error={formState.errors["name"]}
          onChange={handleChange}
        />
        <Input
          type="text"
          label="Místo Konání"
          name="place"
          col="12"
          onChange={handleChange}
          value={data["place"]}
          error={formState.errors["place"]}
        />
        <Input
          type="date"
          label="Datum"
          name="date"
          col="6"
          onChange={handleChange}
          value={data["date"]}
          error={formState.errors["date"]}
        />
        <Input
          type="time"
          label="Čas"
          name="time"
          col="6"
          onChange={handleChange}
          value={data["time"]}
          error={formState.errors["time"]}
        />
        <button disabled={validate()} className="btn btn-primary">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default CreateTournament;
