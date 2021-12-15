import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  MapConsumer,
  Marker,
  Popup,
  Rectangle,
} from "react-leaflet";
import BikePopup from "./BikePopup";

Map.propTypes = {
  zoom: PropTypes.number,
  focusCoords: PropTypes.array,
  bikes: PropTypes.array,
  city: PropTypes.object,
  cities: PropTypes.object,
  chargeStations: PropTypes.array,
  parkingStations: PropTypes.array,
  redrawBikes: PropTypes.func,
};

function Map(props) {
  let [zoom, setZoom] = useState(6);
  let [focusCoords, setFocusCoords] = useState([58.195259, 14.221258]);
  let [bikes, setBikes] = useState([]);
  let [chargeStations, setChargeStations] = useState([]);
  let [parkingStations, setParkingStations] = useState([]);
  let [cityLimits, setCityLimits] = useState([]);
  let [mapInstance, setMapInstance] = useState();

  useEffect(() => {
    setZoom(props.zoom);
    setFocusCoords(props.focusCoords);
    setBikes(props.bikes);
    setChargeStations(props.chargeStations);
    setParkingStations(props.parkingStations);
    createCityLimits();
  }, [props]);

  function closeAnyOpenPopup(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      mapInstance.closePopup();
    }
  }

  function getIcon(markerImg, iconAnchor, popupAnchor) {
    return L.icon({
      iconUrl: require(`../img/mapmarkers/${markerImg}.png`).default,
      iconAnchor: iconAnchor,
      popupAnchor: popupAnchor,
    });
  }

  function drawBike(bike) {
    return (
      <div>
        <Marker
          position={[bike.coordinates.lat, bike.coordinates.long]}
          icon={getIcon("marker_scooter", [15, 15], [0, 0])}
        >
          <Popup>
            <BikePopup
              bike={bike}
              mapInstance={mapInstance}
              cities={props.cities}
              redrawBikes={props.redrawBikes}
            />
          </Popup>
        </Marker>
      </div>
    );
  }

  function drawStation(type, station) {
    let color = type === "parking" ? "blue" : "green";
    let options = { color: color };
    let coords = station.coordinates;

    let markerImg = `bubble_${type}`;

    let markerPosition = [
      coords.northwest.lat,
      (coords.northwest.long + coords.southeast.long) / 2,
    ];

    let bounds = [
      [coords.northwest.lat, coords.northwest.long],
      [coords.southeast.lat, coords.southeast.long],
    ];

    return (
      <>
        <Rectangle bounds={bounds} pathOptions={options} />
        <Marker
          position={markerPosition}
          icon={getIcon(markerImg, [15, 35], [1, -10])}
        >
          <Popup>
            <span>Station: {station.name}</span>
          </Popup>
        </Marker>
      </>
    );
  }

  function createCityLimits() {
    let limitsArray = [];

    if (props.city._id !== "all") {
      limitsArray.push(props.city.coordinates);
      setCityLimits(limitsArray);
      return;
    }

    Object.keys(props.cities).forEach((c) => {
      if (c !== "all") {
        limitsArray.push(props.cities[c].coordinates);
      }
    });

    setCityLimits(limitsArray);
    return;
  }

  function drawCityLimits(coords) {
    let options = { color: "red", fillOpacity: 0, weight: 1 };

    let bounds = [
      [coords.northwest.lat, coords.northwest.long],
      [coords.southeast.lat, coords.southeast.long],
    ];

    return (
      <>
        <Rectangle bounds={bounds} pathOptions={options} />
      </>
    );
  }

  return (
    <div id="map-wrapper-main" onBlur={closeAnyOpenPopup}>
      <MapContainer
        id="map"
        center={focusCoords}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapConsumer>
          {(map) => {
            setMapInstance(map);
            map.setView(focusCoords, zoom);
            return null;
          }}
        </MapConsumer>
        {cityLimits.map((coords, i) => {
          return <div key={i}>{drawCityLimits(coords)}</div>;
        })}
        {bikes.map((bike, i) => {
          return <div key={i}>{drawBike(bike)}</div>;
        })}
        {chargeStations.map((station, i) => {
          return <div key={i}>{drawStation("charge", station)}</div>;
        })}
        {parkingStations.map((station, i) => {
          return <div key={i}>{drawStation("parking", station)}</div>;
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
