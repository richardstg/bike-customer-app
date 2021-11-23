import React from "react";
import TableRow from "./tablerow/tablerow";

const Table = (props) => {
  const { travels } = props;

  return (
    <>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Authorized to edit</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          {travels.map((travel) => (
            <TableRow key={text.id} text={text} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
