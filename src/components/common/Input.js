import React, { useContext } from "react";
import FormElement from "./FormElement";
import { TournamentContext } from "../../context/tournamentContext";

const Input = ({ name, col, label, type = "text", ...rest }) => {
  const { handleSingleInput, state } = useContext(TournamentContext);
  const { data, errors } = state;
  const error = errors[name];

  return (
    <FormElement
      label={label}
      name={name}
      col={col}
      error={error}
      children={
        <input
          className={`form-control${error ? " is-invalid" : ""}`}
          id={name}
          name={name}
          type={type}
          value={data[name]}
          onChange={({ currentTarget }) => handleSingleInput(currentTarget)}
          {...rest}
        />
      }
    />
  );
};

export default Input;
