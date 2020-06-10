import React from "react";
import { TournamentProvider } from "../context/tournamentContext";
import CreateTournament from "./CreateTournament";

const NewTournament = () => {
  return (
    <React.Fragment>
      <TournamentProvider>
        <CreateTournament />
      </TournamentProvider>
    </React.Fragment>
  );
};

export default NewTournament;
