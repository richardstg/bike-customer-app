import React from "react";

import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";

const RentBike = (props) => {
  const { showModal, setShowModal, selectedBike, rentBike, success, error } =
    props;

  return (
    <Modal
      isOpen={showModal}
      toggle={() => setShowModal((state) => !state)}
      centered={true}
      size="sm"
    >
      <ModalHeader>Hyr cykel?</ModalHeader>
      <ModalBody>
        <Button color="primary" onClick={() => rentBike(selectedBike)}>
          Starta
        </Button>{" "}
        <Button
          color="secondary"
          onClick={() => setShowModal((state) => !state)}
        >
          Avbryt
        </Button>
        {success && <p className="text-success">Hyrning startad.</p>}
        {error && <p className="text-danger">Hyrningen misslyckades.</p>}
      </ModalBody>
    </Modal>
  );
};

export default RentBike;
