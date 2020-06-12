import React, { useContext } from "react";
import { TableContext } from "../../context/tableContext";

const TableHeader = ({ columns }) => {
  const { state, onSort } = useContext(TableContext);
  const { sortColumn } = state;

  const raiseSort = (path) => {
    onSort(path);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => {
          return (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => raiseSort(column.path)}
            >
              {" "}
              {column.label} {renderSortIcon(column)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
