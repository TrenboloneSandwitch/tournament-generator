import { Link } from "@reach/router";
import React, { useEffect, useState } from "react";
import firebase from "../services/firebase";
import TournamentsTable from "./TournamentsTable";

const Dashboard = () => {
  const [allTournaments, setAllTournaments] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    path: "title",
    order: "asc",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await firebase.get("tournaments");
      const tournaments = data.map((doc) => doc.data());
      setAllTournaments(tournaments);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    console.log("delte");
  };

  const handleToggle = (id) => {
    console.log("toggle");
  };

  const handleSort = (sortColumn) => {
    console.log("sort");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="newTournament">New Tournament</Link>

      <TournamentsTable
        movies={allTournaments}
        sortColumn={sortColumn}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onSort={handleSort}
      />
    </div>
  );
};

export default Dashboard;
