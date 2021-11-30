import React, { useState, useEffect, useContext } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import bikeImg from "../img/icons/marker-bike.png";
// import loadingStationImg from "../img/icons/marker-loadingstation.svg";
import loadingStationImg from "../img/icons/favicon.svg";

// import "leaflet/dist/leaflet.css";
const fillBlueOptions = { fillColor: "blue" };
let defaultCenter = [59.505, 18];

const dummyLoadingStations = [
  { id: 1, coordinates: [59.505, 17] },
  { id: 2, coordinates: [55.505, 18] },
  { id: 3, coordinates: [52.505, 19] },
  { id: 4, coordinates: [53.505, 20] },
];

const dummyParkingSpots = [
  { id: 1, coordinates: [59.05, 16] },
  { id: 2, coordinates: [55.05, 17] },
  { id: 3, coordinates: [52.05, 18] },
  { id: 4, coordinates: [53.05, 19] },
];

const dummyBikes = [
  { id: 1, coordinates: [58.05, 16] },
  { id: 2, coordinates: [57.05, 17] },
  { id: 3, coordinates: [56.05, 18] },
  { id: 4, coordinates: [55.05, 19] },
];

const iconLoadingStation = new L.Icon({
  iconUrl: loadingStationImg,
  iconRetinaUrl: loadingStationImg,
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(60, 75),
  className: "leaflet-div-icon",
});

// const iconParkingSpot = new L.Icon({
//   iconUrl: require("../img/icons/marker-parkingspot.svg"),
//   iconRetinaUrl: require("../img/icons/marker-parkingspot.svg"),
//   iconAnchor: null,
//   popupAnchor: null,
//   shadowUrl: null,
//   shadowSize: null,
//   shadowAnchor: null,
//   iconSize: new L.Point(60, 75),
//   className: "leaflet-div-icon",
// });

const iconBike = new L.Icon({
  iconUrl: bikeImg,
  iconRetinaUrl: bikeImg,
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(60, 75),
  className: "leaflet-div-icon",
});

function LocationMarker() {
  const [position, setPosition] = useState(null);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      // setPosition(e.latlng);
      // map.flyTo(e.latlng, 16);
    });
  }, [map]);

  return position === null ? null : (
    <Circle center={position} pathOptions={fillBlueOptions} radius={25} />
  );
}

const Map = (props) => {
  const [loadingStations, setLoadingStations] = useState();
  const [parkingSpots, setParkingSpots] = useState();
  const [bikes, setBikes] = useState();

  const fetchData = () => {
    setBikes(dummyBikes);
    setParkingSpots(dummyParkingSpots);
    setLoadingStations(dummyLoadingStations);
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(parkingSpots);
  return (
    <>
      <MapContainer
        style={{ height: "100vh", width: "100%" }}
        center={defaultCenter}
        zoom={8}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {loadingStations &&
          loadingStations.length > 0 &&
          loadingStations.map((loadingStation) => (
            <Marker
              position={loadingStation.coordinates}
              // icon={iconLoadingStation}
            >
              <Popup>Charging station {loadingStation.id}</Popup>
            </Marker>
          ))}
        {parkingSpots &&
          parkingSpots.length > 0 &&
          parkingSpots.map((parkingSpot) => (
            <Marker position={parkingSpot.coordinates}>
              <Popup>Parking {parkingSpot.id}</Popup>
            </Marker>
          ))}
        {bikes &&
          bikes.length > 0 &&
          bikes.map((bike) => (
            <Marker position={bike.coordinates} icon={iconBike}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          ))}
        <LocationMarker />
      </MapContainer>
    </>
  );
};

export default Map;
