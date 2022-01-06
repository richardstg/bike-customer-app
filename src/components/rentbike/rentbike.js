import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";

const RentBike = (props) => {
  const {
    showModal,
    setShowModal,
    selectedBike,
    rentBike,
    error,
    loading,
    user,
  } = props;

  const isAllowed = (user) => {
    if (
      (user && user.payment_method === "monthly") ||
      (user && user.payment_method === "refill" && user.balance > 0)
    ) {
      return true;
    }
    return false;
  };

  return (
    <Modal
      isOpen={showModal}
      toggle={() => setShowModal((state) => !state)}
      centered={true}
      size="sm"
    >
      <ModalHeader className="font-signature color-signature">
        Hyr cykel?
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <button
              className="button-3 w-100"
              data-testid="rent-bike"
              onClick={() => rentBike(selectedBike)}
              disabled={!isAllowed(user)}
            >
              Starta{" "}
              <ClipLoader
                color={"#fffff"}
                loading={loading}
                // css={override}
                size={20}
              />
            </button>
          </Col>
          <Col>
            <button
              className="button-4 w-100"
              data-testid="close-rent"
              color="secondary"
              onClick={() => setShowModal((state) => !state)}
            >
              Avbryt
            </button>
          </Col>
        </Row>
        {!isAllowed(user) && (
          <p className="text-danger mt-2">
            Fyll på pengar eller ändra betalningsmetod för att hyra.
          </p>
        )}
        {error && <p className="text-danger mt-2">Hyrningen misslyckades.</p>}
      </ModalBody>
    </Modal>
  );
};

export default RentBike;
