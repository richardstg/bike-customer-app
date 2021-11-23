import React, { useState, useContext } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useForm } from "react-hook-form";
// import { AuthContext } from "../../context/authcontext";

const Refill = (props) => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} centered="true">
      <ModalHeader>Fyll på konto</ModalHeader>
      <ModalBody>
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Ange belopp:</label>
            <input
              type="number"
              class="form-control"
              id="refillAmount"
              placeholder="Skriv in summa..."
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.toggle}>
          Fyll på
        </Button>{" "}
        <Button color="secondary" onClick={props.toggle}>
          Avbryt
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Refill;
