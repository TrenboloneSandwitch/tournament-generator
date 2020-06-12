import React from "react";
import { Link } from "@reach/router";
import { TableProvider } from "../context/tableContext";
import TournamentsTable from "./TournamentsTable";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="newTournament">New Tournament</Link>

      <TableProvider>
        <TournamentsTable />
      </TableProvider>
    </div>
  );
};

export default Dashboard;
