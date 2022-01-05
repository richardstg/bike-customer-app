import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";

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

  const isAllowed = () => {
    if (
      user.payment_method === "monthly" ||
      (user.payment_method === "refill" && user.balance > 0)
    ) {
      return true;
    }
    return false;
  };

  console.log(selectedBike);

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
        <button
          className="button-3"
          onClick={() => rentBike(selectedBike)}
          disabled={!isAllowed()}
        >
          Starta{" "}
          <ClipLoader
            color={"#fffff"}
            loading={loading}
            // css={override}
            size={20}
          />
        </button>{" "}
        <button
          className="button-4"
          data-testid="close-rent"
          color="secondary"
          onClick={() => setShowModal((state) => !state)}
        >
          Avbryt
        </button>
        {!isAllowed() && (
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
