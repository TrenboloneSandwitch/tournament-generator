import React, { useContext, useState } from "react";
import { useEffectExceptOnMount } from "../../hooks/useEffectExceptOnMount";
import FormElement from "./FormElement";
import { TournamentContext } from "../../context/tournamentContext";

const TagInput = ({ name, col, label, type = "text", emptyText, ...rest }) => {
  const { addArrayItem, deleteArrayItem, state, setError } = useContext(
    TournamentContext
  );
  const [inputValue, setInputValue] = useState("");

  const array = state.data[name];
  const error = state.errors[name];

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
    <FormElement
      label={label}
      name={name}
      col={col}
      error={error}
      children={
        <React.Fragment>
          <input
            className={`form-control${error ? " is-invalid" : ""}`}
            type={type}
            id={name}
            name={name}
            {...rest}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={handleKeyDown}
          />
          <div className="tags">
            {!array.length && <i>{emptyText}</i>}

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
        </React.Fragment>
      }
    />
  );
};

export default TagInput;
