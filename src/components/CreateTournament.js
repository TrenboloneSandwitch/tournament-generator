import React from "react";
import Input from "./common/Input";

const CreateTournament = () => {
  return (
    <div className="row">
      <form className="col-7">
        {" "}
        <Input
          type="text"
          label="Název Turnaje"
          id="tournament-name"
          helpText="Danger"
          placeholder="UEFA Champions League"
        />
      </form>
    </div>
  );
};

export default CreateTournament;
