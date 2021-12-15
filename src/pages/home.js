import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
// import Bikes from "../components/bikes/bikes";
import Map from "../components/map/map";

const Home = (props) => {
  const cityId = "61a7603dbb53f131584de9b3";

  const [selectedCity, setSelectedCity] = useState(cityId);
  const [selectedBike, setSelectedBike] = useState();
  const [city, setCity] = useState();
  const [cities, setCities] = useState();
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState();
  const [showModal, setShowModal] = useState(false);

  const getBikes = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/bikes/city/${selectedCity}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: "Bearer " + context.token,
          },
          // body: JSON.stringify({ name, content, code: codeMode }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setBikes(data.bikes);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getCities = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/cities`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: "Bearer " + context.token,
          },
          // body: JSON.stringify({ name, content, code: codeMode }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setCities(data.cities);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getCity = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/cities/${selectedCity}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: "Bearer " + context.token,
          },
          // body: JSON.stringify({ name, content, code: codeMode }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setCity(data.city);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const rentBike = async () => {
    setSuccess(false);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/trips`,
        {
          method: "POST",
          // headers: {
          //   Authorization: "Bearer " + token,
          // },
          body: JSON.stringify({
            user_id: "XXXXX",
            bike_id: selectedBike._id,
            start_coordinates: selectedBike.coordinates,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClickBike = (bikeId) => {
    setSelectedBike(bikeId);
    setShowModal(true);
  };

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    getCity();
  }, [selectedCity]);

  useEffect(() => {
    getBikes();
  }, [selectedCity]);

  return (
    <>
      <form>
        <select
          class="form-select"
          aria-label="Available bikes"
          onChange={(event) => setSelectedCity(event.target.value)}
        >
          {cities &&
            cities.length > 0 &&
            cities.map((city) => (
              <option selected={selectedCity === city._id} value={city._id}>
                {city.name}
              </option>
            ))}
        </select>
      </form>
      {/* {bikes && bikes.length > 0 && (
        <Bikes
          bikes={bikes}
          selected={selectedBike}
          setSelected={setSelectedBike}
        />
      )} */}
      {city && bikes && bikes.length > 0 && (
        <Map
          city={city.coordinates}
          bikes={bikes}
          parkingSpots={city.parking_stations}
          loadingStations={city.charge_stations}
          onClickBike={handleClickBike}
        />
      )}
      <Modal
        isOpen={showModal}
        toggle={() => setShowModal((state) => !state)}
        centered="true"
        size="sm"
      >
        <ModalHeader>Hyr cykel {selectedBike}</ModalHeader>
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
        </ModalBody>
      </Modal>
    </>
  );
};

export default Home;
