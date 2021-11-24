import React, { useState } from "react";
import { Modal } from "reactstrap";

const bikes = [
  { id: 1, city: "Stockholm" },
  { id: 2, city: "Stockholm" },
  { id: 3, city: "Stockholm" },
];

const Bikes = (props) => {
  const [selected, setSelected] = useState();

  return (
    <>
      <form>
        <select class="form-select" aria-label="Available bikes">
          <option value=""></option>
          {bikes.map((bike) => (
            <option value={bike.id}>{bike.id}</option>
          ))}
        </select>
      </form>
      <Modal></Modal>
    </>
  );
};

export default Bikes;
