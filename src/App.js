import { Router } from "@reach/router";
import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import "./App.scss";
import NewTournament from "./components/NewTournament";

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

        <NewTournament path="newTournament" />
      </Router>
    </div>
  );
}

export default App;
