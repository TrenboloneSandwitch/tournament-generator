import React from "react";

import Table from "./common/Table";
import { TableContext } from "../context/tableContext";

const TournamentsTable = () => {
  const addDeleteColumn = () => {
    return {
      key: "delete",
      content: () => (
        <button
          // onClick={() => this.props.onDelete(movie._id)}
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

      /* content: (movie) => <a href={`/tournament/${movie.key}`}>{movie.name}</a>, */
    },
    { path: "players.length", label: "Počet Hráčů" },
    { path: "date", label: "Datum" },
    { path: "time", label: "Čas", unSortable: true },
    addDeleteColumn(),
  ];

  return <Table columns={columns} TableContext={TableContext} />;
};

export default TournamentsTable;
