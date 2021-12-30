import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

const Rent = (props) => {
  const { userId } = props;
  const [trip, setTrip] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState();

  const finishTrip = async () => {
    setSuccess(false);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/trips/end/${props.match.params.tripId}`,
        {
          method: "PATCH",
          // headers: {
          //   Authorization: "Bearer " + token,
          // },
          body: JSON.stringify([
            {
              propName: "user_id",
              value: userId,
            },
            // { propName: "bike_id", value: selectedBike._id },
            // { propName: "start_coordinates", value: selectedBike.coordinates },
          ]),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setSuccess(true);
      props.history.push("/rent/" + data.trip._id);
    } catch (error) {
      setSuccess(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/trips/${props.match.params.tripId}`,
          {
            method: "GET",
            // headers: {
            //   Authorization: "Bearer " + token,
            // },
            // body: JSON.stringify([
            //   {
            //     propName: "user_id",
            //     value: userId,
            //   },
            //   // { propName: "bike_id", value: selectedBike._id },
            //   // { propName: "start_coordinates", value: selectedBike.coordinates },
            // ]),
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTrip();
  }, [props.match.params.tripId]);

  return (
    <div>
      <h4>Pågående resa</h4>
      <Button data-testid="finish-trip" onClick={finishTrip}>
        Avsluta
      </Button>
      {success && <p className="text-success">Resan avslutades.</p>}
      {error && <p className="text-danger">Avslutning misslyckades.</p>}
    </div>
  );
};

export default Rent;
