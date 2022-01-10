import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";

const RentBike = (props) => {
  const { showModal, setShowModal, rentBike, error, loading, user, bike } =
    props;

  const isAllowed = (user) => {
    if (
      (user &&
        user.payment_method === "monthly" &&
        user.card_information !== "unknown") ||
      (user &&
        user.payment_method === "refill" &&
        user.balance > 10 &&
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
      size="md"
    >
      <ModalHeader className="font-signature color-signature">
        Hyr cykel?
      </ModalHeader>
      <ModalBody>
        <div className="table-wrapper">
          <table className="table" style={{ fontSize: "0.9rem" }}>
            <tbody>
              <tr>
                <th scope="col" className="font-signature color-signature">
                  Cykel-id
                </th>
                <td>{bike._id} </td>
              </tr>
              <tr>
                <th scope="col" className="font-signature color-signature">
                  Användar-id
                </th>
                <td>{user._id}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <span className="mb-0 font-italic" style={{ fontStyle: "italic" }}>
          Ange i cykelns program och starta resan där först.
        </span>
        {!isAllowed(user) && (
          <p className="text-danger mt-2">
            Fyll på pengar eller ändra betalningsmetod för att hyra.
          </p>
        )}
        {error && <p className="text-danger mt-2">Hyrningen misslyckades.</p>}
      </ModalBody>
      <ModalFooter>
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
      </ModalFooter>
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
  bike: PropTypes.object,
};

export default RentBike;
