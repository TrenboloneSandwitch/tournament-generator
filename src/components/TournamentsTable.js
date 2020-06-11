import React, { Component } from "react";

import Table from "./common/Table";

class TournamentsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      /* content: (movie) => <a href={`/tournament/${movie.key}`}>{movie.name}</a>, */
    },
    { path: "players.length", label: "Počet Hráčů" },
    { path: "date", label: "Datum" },
    { path: "time", label: "Čas" },
    this.addDeleteColumn(),
  ];

  addDeleteColumn() {
    return {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      ),
    };
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        data={movies}
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default TournamentsTable;
