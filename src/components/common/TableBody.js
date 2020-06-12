import React, { useContext } from "react";
import _ from "lodash";
import { TableContext } from "../../context/tableContext";

const TableBody = ({ columns }) => {
  const { state } = useContext(TableContext);
  const { data } = state;

  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  return (
    <React.Fragment>
      <tbody>
        {data &&
          data.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={createKey(item, column)}>
                  {renderCell(item, column)}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </React.Fragment>
  );
};

export default TableBody;
