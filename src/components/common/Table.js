import React, { useContext } from "react";
import _ from "lodash";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({ columns, TableContext }) => {
  const { state, onSort } = useContext(TableContext);
  const { data, loading, error, sortColumn } = state;

  const getFiltredData = () => {
    let filtredData = data;
    if (sortColumn) {
      filtredData = _.orderBy(data, [sortColumn.path], [sortColumn.order]);
    }
    return filtredData;
  };

  return (
    <React.Fragment>
      {loading && !error && !getFiltredData() && <div>Loading...</div>}
      {!loading && error && !getFiltredData() && <div>{error}</div>}
      {getFiltredData() && (
        <table className="table">
          <TableHeader
            columns={columns}
            sortColumn={sortColumn}
            onSort={onSort}
          />
          <TableBody columns={columns} data={getFiltredData()} />
        </table>
      )}
    </React.Fragment>
  );
};

export default Table;
