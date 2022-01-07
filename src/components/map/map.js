import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
  Rectangle,
} from "react-leaflet";
import L from "leaflet";
import PropTypes from "prop-types";

const fillBlueOptions = { fillColor: "blue" };

function getIcon(markerImg, iconAnchor, popupAnchor) {
  return L.icon({
    iconUrl: require(`../../img/mapmarkers/${markerImg}.png`).default,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor,
  });
}

const LocationMarker = (props) => {
  const [position, setPosition] = useState(null);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(props.city, 13);
    });
  }, [map, props.city]);

  return position === null ? null : (
    <Circle center={position} pathOptions={fillBlueOptions} radius={25} />
  );
};

const Map = (props) => {
  const { city, loadingStations, parkingSpots, bikes, onClickBike } = props;

  return (
    <>
      <MapContainer
        style={{ height: "80vh", width: "100%" }}
        center={[city.northwest.lat, city.northwest.long]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {loadingStations &&
          loadingStations.length > 0 &&
          loadingStations.map((loadingStation) => (
            <>
              <Rectangle
                key={loadingStation._id}
                bounds={[
                  [
                    loadingStation.coordinates.northwest.lat,
                    loadingStation.coordinates.northwest.long,
                  ],
                  [
                    loadingStation.coordinates.southeast.lat,
                    loadingStation.coordinates.southeast.long,
                  ],
                ]}
                pathOptions={{ color: "green" }}
              />
              <Marker
                key={loadingStation._id + "2"}
                position={[
                  loadingStation.coordinates.northwest.lat,
                  (loadingStation.coordinates.northwest.long +
                    loadingStation.coordinates.southeast.long) /
                    2,
                ]}
                icon={getIcon("bubble_charge", [15, 35], [1, -10])}
              >
                <Popup>Laddstation</Popup>
              </Marker>
            </>
          ))}
        {parkingSpots &&
          parkingSpots.length > 0 &&
          parkingSpots.map((parkingSpot) => (
            <>
              <Rectangle
                key={parkingSpot._id}
                bounds={[
                  [
                    parkingSpot.coordinates.northwest.lat,
                    parkingSpot.coordinates.northwest.long,
                  ],
                  [
                    parkingSpot.coordinates.southeast.lat,
                    parkingSpot.coordinates.southeast.long,
                  ],
                ]}
                pathOptions={{ color: "blue" }}
              />
              <Marker
                key={parkingSpot._id + "2"}
                position={[
                  parkingSpot.coordinates.northwest.lat,
                  (parkingSpot.coordinates.northwest.long +
                    parkingSpot.coordinates.southeast.long) /
                    2,
                ]}
                icon={getIcon("bubble_parking", [15, 35], [1, -10])}
              >
                <Popup>Parkering</Popup>
              </Marker>
            </>
          ))}
        {bikes &&
          bikes.length > 0 &&
          bikes
            .filter((bike) => bike.bike_status === "available")
            .map((bike) => (
              <Marker
                key={bike._id}
                position={[bike.coordinates.lat, bike.coordinates.long]}
                icon={getIcon("marker_scooter", [15, 15], [0, 0])}
              >
                <Popup>
                  <button
                    className="button-3"
                    onClick={() => {
                      onClickBike(bike);
                    }}
                  >
                    Hyr
                  </button>
                </Popup>
              </Marker>
            ))}
        <Rectangle
          bounds={[
            [city.northwest.lat, city.northwest.long],
            [city.southeast.lat, city.southeast.long],
          ]}
          pathOptions={{ color: "red", fillOpacity: 0, weight: 1 }}
        />
        <LocationMarker
          city={[
            (city.northwest.lat + city.southeast.lat) / 2,
            (city.northwest.long + city.southeast.long) / 2,
          ]}
        />
      </MapContainer>
    </>
  );
};

Map.propTypes = {
  bikes: PropTypes.array,
  city: PropTypes.object,
  loadingStations: PropTypes.array,
  parkingSpots: PropTypes.array,
  onClickBike: PropTypes.func,
};

LocationMarker.propTypes = {
  city: PropTypes.array,
};

export default Map;
