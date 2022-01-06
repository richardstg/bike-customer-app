import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const RentTable = (props) => {
  const { trip } = props;

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
};

RentTable.propTypes = {
  trip: {
    bike_id: PropTypes.string,
    start_time: PropTypes.string,
    stop_time: PropTypes.string,
    distance: PropTypes.string,
    price: PropTypes.string,
    average_speed: PropTypes.string,
  },
};

export default RentTable;
