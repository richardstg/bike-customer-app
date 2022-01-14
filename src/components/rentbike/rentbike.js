import React, { useState, useEffect } from "react";
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
  const [price, setPrice] = useState(null);
  const [trip, setTrip] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { showModal, setShowModal, user, bike, token, history } = props;

  const getTrip = async (tripId) => {
    setError(false);
    if (!trip) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/trips/${tripId}`,
        {
          method: "GET",
          headers: {
            "x-access-token": token,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error();
      }
      setLoading(false);
      history.push("/rent/" + data.trip._id);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const isAllowed = (user) => {
    if (
      (user &&
        user.payment_method === "monthly" &&
        user.card_information !== "unknown") ||
      (user &&
        user.payment_method === "refill" &&
        user.balance >= price &&
        user.card_information !== "unknown")
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const getPrice = async () => {
      setError(false);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/prices`,
          {
            method: "GET",
            headers: {
              "x-access-token": token,
            },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error();
        }

        setPrice(
          data.prices[0].starting_fee +
            data.prices[0].price_per_minute +
            data.prices[0].penalty_fee
        );
      } catch (error) {
        setError(true);
      }
    };
    getPrice();
  }, [token]);

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
        <p
          className="mb-1 font-italic font-signature color-signature"
          style={{ fontStyle: "italic", fontSize: "0.8rem" }}
        >
          Ange i cykelns program:
        </p>
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
        {isAllowed(user) ? (
          <>
            <p
              className="mb-1 font-italic font-signature color-signature"
              style={{
                fontStyle: "italic",
                fontSize: "0.8rem",
              }}
            >
              Ange id:t för resan som returnerats från cykelns program:
            </p>
            <input
              required
              className="w-100 form-control"
              onChange={(event) => setTrip(event.target.value)}
            />
          </>
        ) : (
          <p className="text-danger mt-2">
            Fyll på pengar eller ändra betalningsmetod för att hyra.
          </p>
        )}
        {error && (
          <p className="text-danger mt-2">
            Det inträffade ett fel. Försök igen senare.
          </p>
        )}
      </ModalBody>
      <ModalFooter>
        <Row>
          <Col>
            <button
              className="button-3 w-100"
              data-testid="rent-bike"
              onClick={() => getTrip(trip)}
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
  user: PropTypes.object,
  bike: PropTypes.object,
  token: PropTypes.string,
  history: PropTypes.object,
};

export default RentBike;
