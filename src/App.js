import { Router } from "@reach/router";
import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import NewTournament from "./components/NewTournament";
import TournamentDetail from "./components/TournamentDetail";
import "./App.scss";

function App() {
  const [pageBg] = useState("bg-ball.jpg");

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(/images/${pageBg})`,
        width: "100%",
        height: "100vh",
      }}
    >
      <Router>
        <Dashboard path="/" />
        <TournamentDetail path="tournament/:id" />
        <NewTournament path="newTournament" />
      </Router>
    </div>
  );
}

export default App;
