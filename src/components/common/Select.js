import React, { useContext } from "react";
import ReactSelect from "react-select";
import { TournamentContext } from "../../context/tournamentContext";
import FormElement from "./FormElement";

const Select = ({ name, col, label, ...rest }) => {
  const { state } = useContext(TournamentContext);
  const { data, errors } = state;
  const error = errors[name];

  return (
    <FormElement
      label={label}
      name={name}
      col={col}
      error={error}
      children={
        <ReactSelect id={`select-${name}`} value={data[name]} {...rest} />
      }
    />
  );
};

export default Select;
