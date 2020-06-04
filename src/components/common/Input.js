import React from "react";

const Input = React.memo(({ label, name, col = "12", error, ...rest }) => {
  return (
    <div className={`form-group col-${col}`}>
      <label htmlFor={name}>{label}</label>
      <input
        className={`form-control${error ? " is-invalid" : ""}`}
        id={name}
        name={name}
        {...rest}
      />
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
});

export default Input;
