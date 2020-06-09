import React from "react";

const FormElement = ({ name, label, col, error, children }) => {
  return (
    <div className={`form-group col-${col}`}>
      <label htmlFor={name}>{label}</label>

      {children}

      {error && (
        <small
          id={`${name}-help`}
          className={`form-text text-${!error ? "muted" : "danger"} text-right`}
        >
          {error}
        </small>
      )}
    </div>
  );
};

export default FormElement;
