import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
// import { Line, Circle } from "rc-progress";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

let bikeInterval;

const Rent = (props) => {
  const [trip, setTrip] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [finished, setFinished] = useState(false);
  const [bike, setBike] = useState();
  const [bikeError, setBikeError] = useState();

  const finishTrip = async () => {
    setLoading(true);
    setFinished(false);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/trips/end/${props.match.params.tripId}`,
        {
          method: "PATCH",
          // headers: {
          //   Authorization: "Bearer " + token,
          // },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setFinished(true);
      setLoading(false);
      // setTrip(data.trip);
      // setTimeout(() => props.history.push("/" + data.trip._id), 1000);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    const fetchBike = async (bikeId) => {
      setBikeError(false);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/bikes/${bikeId}`,
          {
            method: "GET",
            // headers: {
            //   Authorization: "Bearer " + token,
            // },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        setBike(data.bike);
      } catch (error) {
        setBikeError(true);
      }
    };
    const fetchTrip = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/trips/${props.match.params.tripId}`,
          {
            method: "GET",
            // headers: {
            //   Authorization: "Bearer " + token,
            // },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        setTrip(data.trip);
        fetchBike(data.trip.bike_id);
        bikeInterval = setInterval(() => fetchBike(data.trip.bike_id), 30000);
      } catch (error) {
        setError(true);
      }
    };

    fetchTrip();

    return () => clearInterval(bikeInterval);
  }, [props.match.params.tripId]);

  const barStatus = (batteryStatus) => {
    if (batteryStatus < 10) {
      return "error";
    } else if (batteryStatus < 50) {
      return "active";
    } else if (batteryStatus < 80) {
      return "default";
    }
    return "success";
  };

  if (finished) {
    return (
      <div>
        <h5 className="font-signature color-signature">Avslutad resa</h5>
        <table className="table" style={{ fontSize: "0.9rem" }}>
          <tbody>
            <tr>
              <th scope="col" className="font-signature color-signature">
                Starttid
              </th>
              <td>
                {new Date(trip.start_time).toLocaleString("sv-SE", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </td>
            </tr>
            <tr>
              <th scope="col" className="font-signature color-signature">
                Sluttid
              </th>
              <td>
                {new Date(trip.stop_time).toLocaleString("sv-SE", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </td>
            </tr>
            <tr>
              <th scope="col" className="font-signature color-signature">
                Genomsnittlig hastighet
              </th>
              <td>{trip.average_speed} km/h</td>
            </tr>
            <tr>
              <th scope="col" className="font-signature color-signature">
                Distans
              </th>
              <td>{trip.distance} km</td>
            </tr>
            <tr>
              <th scope="col" className="font-signature color-signature">
                Kostnad
              </th>
              <td>{trip.price} SEK</td>
            </tr>
          </tbody>
        </table>
        <Link to="/">
          <button className="button-3 full-width">Tillbaka</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h5 className="color-signature font-signature mb-3">Pågående resa</h5>
      {trip && (
        <p>
          Resan påbörjades{" "}
          {new Date(trip.start_time).toLocaleString("sv-SE", {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </p>
      )}
      {bike && (
        <div className="mb-3">
          <h6 className="color-signature font-signature mb-3">Batteri</h6>
          {/* <Circle
            percent={bike.battery_status}
            strokeWidth="4"
            // strokeColor="#D3D3D3"
          /> */}
          <Progress
            // type="circle"
            percent={bike.battery_status}
            status={barStatus(bike.battery_status)}
            strokeWidth={10}
            theme={{
              error: {
                symbol: bike.battery_status + "%",
                trailColor: "pink",
                color: "red",
              },
              default: {
                symbol: bike.battery_status + "%",
                trailColor: "lightblue",
                color: "blue",
              },
              active: {
                symbol: bike.battery_status + "%",
                trailColor: "yellow",
                color: "orange",
              },
              success: {
                symbol: bike.battery_status + "%",
                trailColor: "lime",
                color: "green",
              },
            }}
          />
        </div>
      )}
      <button
        className="button-3 full-width"
        data-testid="finish-trip"
        onClick={finishTrip}
      >
        Avsluta <ClipLoader color={"#fffff"} loading={loading} size={20} />
      </button>
      {bikeError && (
        <p className="text-danger mt-2">Hämtning av cykeldata misslyckades.</p>
      )}
      {error && <p className="text-danger mt-2">Avslutning misslyckades.</p>}
    </div>
  );
};

export default Rent;
