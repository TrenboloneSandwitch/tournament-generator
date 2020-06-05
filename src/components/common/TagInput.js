import React, { useState, useContext } from "react";
import { TournamentContext } from "../../context/tournamentContext";
import { useEffectExceptOnMount } from "../../hooks/useEffectExceptOnMount";

const TagInput = React.memo(({ label, name, error, tags, ...rest }) => {
  const { addArrayItem, deleteArrayItem, state, setError } = useContext(
    TournamentContext
  );

  const array = state.data[name];
  const [inputValue, setInputValue] = useState("");

  useEffectExceptOnMount(() => {
    setError(name, array);
  }, [array]);

  const handleDelete = (targetPlayer) => {
    deleteArrayItem(targetPlayer, name, array);
  };

  const handleKeyDown = (e) => {
    if (inputValue.trim().replace(",", "").replace(";", "") === "") return;
    if (e.isComposing || e.key === "," || e.key === ";" || e.keyCode === 13) {
      const newValue = inputValue.trim().replace(",", "").replace(";", "");
      setInputValue("");

      addArrayItem(newValue, name, array);
    }
  };

  return (
    <div className={`form-group col-12`}>
      <label htmlFor={name}>{label}</label>
      <input
        className={`form-control${error ? " is-invalid" : ""}`}
        type="text"
        id={name}
        name={name}
        {...rest}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={handleKeyDown}
      />
      <div className="tags">
        {!array.length && <i>Please add four players at least</i>}

        {array.map((n) => (
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
});

export default TagInput;
