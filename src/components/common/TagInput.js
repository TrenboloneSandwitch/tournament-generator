import React, { useState, useContext } from "react";
import { TournamentContext } from "../../context/tournamentContext";

const TagInput = ({ label, name, col = "12", error, tags, ...rest }) => {
  const { addTag, deleteTag, state } = useContext(TournamentContext);

  const { players } = state.data;
  const [inputValue, setInputValue] = useState("");

  const handleDelete = (targetPlayer) => {
    deleteTag(targetPlayer);

    // setNames(newNames);
  };

  const handleKeyDown = (e) => {
    if (inputValue.trim().replace(",", "").replace(";", "") === "") return;
    if (e.isComposing || e.key === "," || e.key === ";" || e.keyCode === 13) {
      const newValue = inputValue.trim().replace(",", "").replace(";", "");
      setInputValue("");

      addTag(newValue);
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
        {!players.length && <i>Please add four players at least</i>}

        {players.map((n) => (
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
