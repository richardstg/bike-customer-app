import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Table } from "reactstrap";
import { AuthContext } from "../../context/authcontext";

const travels = [
  {
    id: 1,
    user_id: 12,
    bike_id: 1,
    city: "Stockholm",
    start_time: "00:00:00",
    stop_time: "00:01:00",
    start_coordinates: "xxxxxxx",
    stop_coordinates: "yyyyyyy",
    average_speed: "xxxxxxx",
    distance: "xxxxxxx",
    price: "20",
  },
  {
    id: 1,
    user_id: 12,
    bike_id: 1,
    city: "Stockholm",
    start_time: "00:00:00",
    stop_time: "00:01:00",
    start_coordinates: "xxxxxxx",
    stop_coordinates: "yyyyyyy",
    average_speed: "xxxxxxx",
    distance: "xxxxxxx",
    price: "20",
  },
  {
    id: 1,
    user_id: 12,
    bike_id: 1,
    city: "Stockholm",
    start_time: "00:00:00",
    stop_time: "00:01:00",
    start_coordinates: "xxxxxxx",
    stop_coordinates: "yyyyyyy",
    average_speed: "xxxxxxx",
    distance: "xxxxxxx",
    price: "20",
  },
  {
    id: 1,
    user_id: 12,
    bike_id: 1,
    city: "Stockholm",
    start_time: "00:00:00",
    stop_time: "00:01:00",
    start_coordinates: "xxxxxxx",
    stop_coordinates: "yyyyyyy",
    average_speed: "xxxxxxx",
    distance: "xxxxxxx",
    price: "20",
  },
];

const Travels = (props) => {
  return (
    <>
      <h4 className="mt-3 mb-3">Resehistorik</h4>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Cykel-id</th>
            <th scope="col">Stad</th>
            <th scope="col">Starttid</th>
            <th scope="col">Sluttid</th>
            <th scope="col">Startkoordinater</th>
            <th scope="col">Slutkoordinater</th>
            <th scope="col">Genomsnittlig hastighet (km/h)</th>
            <th scope="col">Distans (km)</th>
            <th scope="col">Kostnad (SEK)</th>
          </tr>
        </thead>
        <tbody>
          {travels.map((travel) => (
            <tr>
              <td>{travel.bike_id}</td>
              <td>{travel.city}</td>
              <td>{travel.start_time}</td>
              <td>{travel.stop_time}</td>
              <td>{travel.start_coordinates}</td>
              <td>{travel.stop_coordinates}</td>
              <td>{travel.average_speed}</td>
              <td>{travel.distance}</td>
              <td>{travel.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Travels;
