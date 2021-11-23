import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
// import { AuthContext } from "../../context/authcontext";
import ChangePayment from "./changepayment/changepayment";
import Refill from "./refill/refill";

const payment_method = "refill";

const Payment = (props) => {
  const [changePayment, setChangePayment] = useState(false);
  const [refill, setRefill] = useState(false);

  return (
    <>
      <h4 className="mt-3 mb-3">Betalningsmetod</h4>
      <p>
        Nuvarande: {payment_method === "monthly" ? "Månadsvis" : "Påfyllning"}
      </p>
      {payment_method === "refill" && (
        <div>
          <p>Saldo: 20 SEK</p>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setRefill(true);
            }}
          >
            Fyll på saldo
          </a>
        </div>
      )}
      <a
        href="#"
        onClick={(event) => {
          event.preventDefault();
          setChangePayment(true);
        }}
      >
        Ändra betalningsmetod
      </a>

      <ChangePayment
        isOpen={changePayment}
        currentMethod={payment_method}
        toggle={() => setChangePayment(false)}
      />
      <Refill isOpen={refill} toggle={() => setRefill(false)} />
    </>
  );
};

export default Payment;
