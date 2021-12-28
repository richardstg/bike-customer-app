import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import Map from "../components/map/map";
import RentBike from "../components/rentbike/rentbike";
import SelectCity from "../components/selectcity/selectcity";

const Home = (props) => {
  const [selectedCity, setSelectedCity] = useState();
  const [selectedBike, setSelectedBike] = useState();
  const [city, setCity] = useState();
  const [cities, setCities] = useState();
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
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
            user_id: props.user._id,
            bike_id: selectedBike._id,
            start_coordinates: selectedBike.coordinates,
          }),
          body: JSON.stringify([
            { propName: "user_id", value: props.user._id },
            { propName: "bike_id", value: selectedBike._id },
            { propName: "start_coordinates", value: selectedBike.coordinates },
          ]),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setSuccess(true);
      props.history.push("/rent/" + data.startedTrip._id);
    } catch (error) {
      setError(error.message);
      setSuccess(false);
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

  useEffect(() => {
    props.user.city && setSelectedCity(props.user.city);
  }, [props.user.city]);

  return (
    <>
      <SelectCity
        cities={cities}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
      {city && bikes && bikes.length > 0 && (
        <Map
          city={city.coordinates}
          bikes={bikes}
          parkingSpots={city.parking_stations}
          loadingStations={city.charge_stations}
          onClickBike={handleClickBike}
        />
      )}
      <RentBike
        showModal={showModal}
        setShowModal={setShowModal}
        selectedBike={selectedBike}
        rentBike={rentBike}
        success={success}
        error={error}
      />
    </>
  );
};

export default withRouter(Home);
