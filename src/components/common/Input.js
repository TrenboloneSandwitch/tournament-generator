import React from "react";

const Input = ({ label, id, helpText, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input className="form-control" id={id} {...rest} />
      {helpText && (
        <small
          id={`${id}-help`}
          className={`form-text text-${!error ? "muted" : "danger"} text-right`}
        >
          {helpText}
        </small>
      )}
    </div>
  );
};

export default Input;
