import React, { useContext } from "react";
import { Link } from "@reach/router";

import Table from "./common/Table";
import { TableContext } from "../context/tableContext";

const TournamentsTable = () => {
  const { onDelete } = useContext(TableContext);

  const addDeleteColumn = () => {
    return {
      key: "delete",
      content: (tournament) => (
        <button
          onClick={() => {
            onDelete(tournament.id);
          }}
          className="btn btn-danger"
        >
          Delete
        </button>
      ),
      unSortable: true,
    };
  };

  const columns = [
    {
      path: "name",
      label: "Name",
      content: (tournament) => (
        <Link to={`/tournament/${tournament.id}`}>{tournament.name}</Link>
      ),
    },
    { path: "players.length", label: "Počet Hráčů" },
    { path: "date", label: "Datum" },
    { path: "time", label: "Čas", unSortable: true },
    addDeleteColumn(),
  ];

  return <Table columns={columns} TableContext={TableContext} />;
};

export default TournamentsTable;
