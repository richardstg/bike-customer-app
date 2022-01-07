import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";

const RentBike = (props) => {
  const { showModal, setShowModal, rentBike, error, loading, user } = props;

  const isAllowed = (user) => {
    if (
      (user &&
        user.payment_method === "monthly" &&
        user.card_information !== "unknown") ||
      (user &&
        user.payment_method === "refill" &&
        user.balance > 0 &&
        user.card_information !== "unknown")
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
              onClick={() => rentBike()}
              disabled={!isAllowed(user)}
            >
              Starta <ClipLoader color={"#fffff"} loading={loading} size={20} />
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

RentBike.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  rentBike: PropTypes.func,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  user: PropTypes.object,
};

export default RentBike;
