import React, { useState, useContext } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useForm } from "react-hook-form";
// import { AuthContext } from "../../context/authcontext";

const ChangePayment = (props) => {
  const [paymentMethod, setPaymentMethod] = useState(props.currentMethod);

  const submitChanges = (event) => {
    event.preventDefault();
  };

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} centered="true">
      <ModalHeader>Ändra betalningsmetod</ModalHeader>
      <ModalBody>
        <form onSubmit={submitChanges}>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="paymentMethod"
              id="radioRefill"
              value="refill"
              checked={paymentMethod === "refill"}
              onChange={(event) => setPaymentMethod(event.target.value)}
            />
            <label class="form-check-label" for="radioRefill">
              Påfyllning
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="paymentMethod"
              id="radioMonthly"
              value="monthly"
              checked={paymentMethod === "monthly"}
              onChange={(event) => setPaymentMethod(event.target.value)}
            />
            <label class="form-check-label" for="radioMonthly">
              Månadsvis
            </label>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Kortnummer:</label>
            <input
              type="number"
              class="form-control"
              id="cardNumber"
              placeholder="Skriv in kortnummer..."
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.toggle}>
          Spara
        </Button>{" "}
        <Button color="secondary" onClick={props.toggle}>
          Avbryt
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ChangePayment;
