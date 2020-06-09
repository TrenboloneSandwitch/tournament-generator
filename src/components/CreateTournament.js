import firebase from "../services/firebase";
import React, { useContext, useEffect, useState } from "react";
import { TournamentContext } from "../context/tournamentContext";
import { validate } from "../services/validation";

import Input from "./common/Input";
import TagInput from "./common/TagInput";
import Select from "./common/Select";

const CreateTournament = React.memo(() => {
  const { handleSingleInput, submitForm, state } = useContext(
    TournamentContext
  );
  const { data } = state;

  const tournamentTypes = [
    { label: "Všichni proti všem", value: "round-robin" },
    { label: "Skupinový pavouk", value: "groups-final" },
  ];

  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await firebase.get("clubs");
      const allClubs = data.map((doc) => {
        const { name, alpha3Code } = doc.data();
        return { label: name, value: alpha3Code };
      });
      setClubs(allClubs);
    };
    fetchData();
  }, []);

  const doSubmit = async (e) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <div className="form row container align-items-center justify-content-center">
      <form className="col-7 row" onSubmit={doSubmit}>
        {" "}
        <Input label="Název" name="name" col="12" />
        <Input label="Místo Konání" name="place" col="12" />
        <Input type="date" label="Datum" name="date" col="6" />
        <Input type="time" label="Čas" name="time" col="6" />
        <TagInput
          label="Hráči"
          name="players"
          col="12"
          placeholder="Use comma, semicolon or ENTER for adding new tag"
          emptyText="Please add at least four players..."
        />
        <Select
          label="Formát turnaje"
          name="type"
          col="12"
          options={tournamentTypes}
          isSearchable={false}
          onChange={(e) => handleSingleInput({ name: "type", value: e })}
        />
        <Select
          label="Hratelná Mužstva"
          name="teams"
          col="12"
          options={clubs}
          isMulti={true}
          isSearchable={true}
          onChange={(e) => handleSingleInput({ name: "teams", value: e })}
        />
        <button disabled={validate(data)} className="btn btn-primary btn-block">
          SUBMIT
        </button>
      </form>
    </div>
  );
});

export default CreateTournament;
