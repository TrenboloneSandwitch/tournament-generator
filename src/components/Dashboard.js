import { Link } from "@reach/router";
import React, { useEffect, useState } from "react";
import firebase from "../services/firebase";

const Dashboard = () => {
  const [allTournaments, setAllTournaments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await firebase.get("tournaments");
      const tournaments = data.map((doc) => doc.data());
      setAllTournaments(tournaments);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="newTournament">New Tournament</Link>

      <ul>
        {allTournaments &&
          allTournaments.map((t) => (
            <li key={t.name.replace(" ", "-").toLowerCase()}>{t.name}</li>
          ))}
      </ul>
    </div>
  );
};

export default Dashboard;
