import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const bikes = [
  { id: 1, city: "Stockholm" },
  { id: 2, city: "Stockholm" },
  { id: 3, city: "Stockholm" },
];

const Bikes = (props) => {
  const [selected, setSelected] = useState();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <form>
        <select
          class="form-select"
          aria-label="Available bikes"
          onChange={(event) => setSelected(event.target.value)}
        >
          <option value="" className="font-weight-bold">
            Välj cykel
          </option>
          {bikes.map((bike) => (
            <option value={bike.id}>Cykel {bike.id}</option>
          ))}
        </select>
        <Button
          color="secondary"
          onClick={() => {
            selected && setShowModal(true);
          }}
        >
          Välj
        </Button>
      </form>
      <Modal
        isOpen={showModal}
        toggle={() => setShowModal((state) => !state)}
        centered="true"
      >
        <ModalHeader>Hyr cykel {selected}</ModalHeader>
        <ModalBody>
          <form>
            <div className="form-group">
              <label for="exampleInputEmail1">Ange tid:</label>
              <input
                type="number"
                className="form-control"
                id="refillAmount"
                placeholder="Skriv in tid..."
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => setShowModal((state) => !state)}
          >
            Hyr
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => setShowModal((state) => !state)}
          >
            Avbryt
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Bikes;
