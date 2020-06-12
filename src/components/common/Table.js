import React, { useContext } from "react";
import { TableContext } from "../../context/tableContext";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({ columns }) => {
  const { state } = useContext(TableContext);
  const { data, loading, error } = state;
  return (
    <React.Fragment>
      {loading && !error && !data && <div>Loading...</div>}
      {!loading && error && !data && <div>{error}</div>}
      {data && (
        <table className="table">
          <TableHeader columns={columns} />
          <TableBody columns={columns} />
        </table>
      )}
    </React.Fragment>
  );
};

export default Table;
