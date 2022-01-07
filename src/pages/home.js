import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import PropTypes from "prop-types";
import Map from "../components/map/map";
import RentBike from "../components/rentbike/rentbike";
import SelectCity from "../components/selectcity/selectcity";

const Home = (props) => {
  const [selectedCity, setSelectedCity] = useState();
  const [selectedBike, setSelectedBike] = useState();
  const [city, setCity] = useState();
  const [cities, setCities] = useState();
  const [bikes, setBikes] = useState([]);
  const [rentLoading, setRentLoading] = useState(false);
  const [rentError, setRentError] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [citiesError, setCitiesError] = useState(false);
  const [bikesLoading, setBikesLoading] = useState(false);
  const [bikesError, setBikesError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const rentBike = async () => {
    setRentError(false);
    setRentLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/trips`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            headers: { "x-access-token": props.token },
          },
          body: JSON.stringify({
            user_id: props.user._id,
            bike_id: selectedBike._id,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setRentLoading(false);
      props.history.push("/rent/" + data.startedTrip._id);
    } catch (error) {
      setRentLoading(false);
      setRentError(true);
    }
  };

  const handleClickBike = (bike) => {
    setSelectedBike(bike);
    setShowModal(true);
  };

  useEffect(() => {
    const getCities = async () => {
      setCitiesError(false);
      setCitiesLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/cities`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              headers: { "x-access-token": props.token },
            },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        setCities(data.cities);
        setCitiesLoading(false);
      } catch (err) {
        setCitiesError(true);
        setCitiesLoading(false);
      }
    };
    getCities();
  }, []);

  useEffect(() => {
    const getBikes = async () => {
      setBikesError(false);
      setBikesLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/bikes/city/${selectedCity}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              headers: { "x-access-token": props.token },
            },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        setBikes(data.bikes);
        setBikesLoading(false);
      } catch (err) {
        setBikesError(true);
        setBikesLoading(false);
      }
    };
    const getCity = async () => {
      setCityError(false);
      setCityLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/cities/${selectedCity}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              headers: { "x-access-token": props.token },
            },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        setCity(data.city);
        setCityLoading(false);
      } catch (err) {
        setCityError(true);
        setCityLoading(false);
      }
    };

    selectedCity && getBikes() && getCity();
  }, [selectedCity]);

  useEffect(() => {
    !props.user.city
      ? setSelectedCity("61a7603dbb53f131584de9b3")
      : setSelectedCity(props.user.city);
  }, [props.user.city]);

  return (
    <>
      <SelectCity
        cities={cities}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
      <ClipLoader
        color={"#298E46"}
        loading={cityLoading || citiesLoading || bikesLoading}
        size={40}
      />
      {!(cityLoading || citiesLoading || bikesLoading) &&
        (cityError || citiesError || bikesError) && (
          <p className="text-danger">Ett fel uppstod. Försök igen senare.</p>
        )}
      {city && bikes && bikes.length > 0 && (
        <Map
          city={city.coordinates}
          bikes={bikes}
          parkingSpots={city.parking_stations}
          loadingStations={city.charge_stations}
          onClickBike={handleClickBike}
        />
      )}
      {selectedBike && (
        <RentBike
          showModal={showModal}
          setShowModal={setShowModal}
          bike={selectedBike}
          rentBike={rentBike}
          error={rentError}
          loading={rentLoading}
          user={props.user}
        />
      )}
    </>
  );
};

Home.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object,
  token: PropTypes.string,
};

export default withRouter(Home);
