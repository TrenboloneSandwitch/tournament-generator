import React, { useState } from "react";
import { id } from "uuid/v4";

const TagInput = ({ label, name, col = "12", error, tags, ...rest }) => {
  const [names, setNames] = useState([
    "Honza",
    "Zdenek",
    "David",
    "Martin",
    "Frantisek",
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleDelete = (targetName) => {
    const newNames = names.filter((name) => targetName !== name);
    setNames(newNames);
  };

  const handleKeyDown = (e) => {
    if (inputValue.trim().replace(",", "").replace(";", "") === "") return;
    if (e.isComposing || e.key === "," || e.key === ";" || e.keyCode === 13) {
      const newValue = inputValue.trim().replace(",", "").replace(";", "");
      setInputValue("");
      setNames([...names, newValue]);
    }
  };

  return (
    <div className={`form-group col-${col}`}>
      <label htmlFor={name}>{label}</label>
      <input
        className={`form-control${error ? " is-invalid" : ""}`}
        id={name}
        name={name}
        {...rest}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={handleKeyDown}
      />
      <div className="tags">
        {!names.length && <i>Please add four players at least</i>}

        {names.map((n) => (
          <div className="tags__element" key={n + Math.random()}>
            <span className="tags__element__text">{n}</span>
            <span
              className="tags__element__delete"
              onClick={() => handleDelete(n)}
            >
              &times;
            </span>
          </div>
        ))}
      </div>
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

export default TagInput;
