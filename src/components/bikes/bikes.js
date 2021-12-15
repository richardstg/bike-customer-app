import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const Bikes = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { bikes, selected, setSelected } = props;

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
            <option value={bike._id}>Cykel {bike._id}</option>
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
              <select
                class="form-select"
                aria-label="Available bikes"
                // onChange={(event) => setSelected(event.target.value)}
              >
                <option value="" className="font-weight-bold">
                  Tid
                </option>
                <option value="30">30 min</option>
                <option value="60">60 min</option>
                <option value="90">90 min</option>
                <option value="120">120 min</option>
                <option value="150">150 min</option>
                <option value="180">180 min</option>
                <option value="210">210 min</option>
                <option value="240">240 min</option>
              </select>
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
