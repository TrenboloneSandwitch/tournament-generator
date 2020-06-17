import React, { useState, useEffect } from "react";
import firebase from "../services/firebase";

const TournamentDetail = ({ id }) => {
  const [currentTournament, setCurrentTournament] = useState(null);

  useEffect(() => {
    firebase
      .getById("tournaments", id)
      .then((data) => setCurrentTournament(data))
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setCurrentTournament(null);
    };
  }, []);

  return (
    <div>
      <h2>Tournament detail</h2>
      {!currentTournament ? <i>Loading...</i> : <i>{currentTournament.name}</i>}
    </div>
  );
};

export default TournamentDetail;
