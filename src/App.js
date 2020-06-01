import React, { useState } from "react";

import "./App.scss";

import CreateTournament from "./components/CreateTournament";
import { TournamentProvider } from "./context/tournamentContext";

function App() {
  const [pageBg, setPageBg] = useState("trophy.jpg");

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(/images/${pageBg})`,
        width: "100%",
        height: "100vh",
      }}
    >
      <TournamentProvider>
        <CreateTournament />
      </TournamentProvider>
    </div>
  );
}

export default App;
