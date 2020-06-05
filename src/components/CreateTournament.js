import Select from "react-select";
import React, { useContext } from "react";
import { TournamentContext } from "../context/tournamentContext";
import { validate } from "../services/validation";
import Input from "./common/Input";
import TagInput from "./common/TagInput";

const CreateTournament = React.memo(() => {
  const { handleSingleInput, submitForm, state } = useContext(
    TournamentContext
  );
  const { data, errors } = state;
  const tournamentTypes = [
    { label: "Všichni proti všem", value: "round-robin" },
    { label: "Skupinový pavouk", value: "groups-final" },
  ];

  const doSubmit = async (e) => {
    e.preventDefault();
    submitForm();
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
          error={errors["name"]}
          onChange={({ currentTarget }) => handleSingleInput(currentTarget)}
        />
        <Input
          type="text"
          label="Místo Konání"
          name="place"
          col="12"
          onChange={({ currentTarget }) => handleSingleInput(currentTarget)}
          value={data["place"]}
          error={errors["place"]}
        />
        <Input
          type="date"
          label="Datum"
          name="date"
          col="6"
          onChange={({ currentTarget }) => handleSingleInput(currentTarget)}
          value={data["date"]}
          error={errors["date"]}
        />
        <Input
          type="time"
          label="Čas"
          name="time"
          col="6"
          onChange={({ currentTarget }) => handleSingleInput(currentTarget)}
          value={data["time"]}
          error={errors["time"]}
        />
        <TagInput
          label="Hráči"
          name="players"
          placeholder="Use comma, semicolon or ENTER for adding new tag"
          error={errors["players"]}
        />
        <div className="form-group col-12">
          <label htmlFor="select-type">Formát turnaje</label>
          <Select
            id="select-type"
            isSearchable={false}
            value={data.type}
            options={tournamentTypes}
            placeholder="Filter by Region"
            onChange={(e) => handleSingleInput({ name: "type", value: e })}
          />
        </div>
        <TagInput
          label="Týmy"
          name="teams"
          placeholder="Use comma, semicolon or ENTER for adding new tag"
          error={errors["teams"]}
        />
        <button disabled={validate(data)} className="btn btn-primary btn-block">
          SUBMIT
        </button>
      </form>
    </div>
  );
});

export default CreateTournament;
