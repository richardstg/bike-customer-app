import React from "react";
import PropTypes from "prop-types";

const SelectCity = (props) => {
  const { cities, selectedCity, setSelectedCity } = props;

  return (
    <form className="mb-2">
      <select
        className="form-select"
        aria-label="Available bikes"
        onChange={(event) => setSelectedCity(event.target.value)}
        value={selectedCity}
        data-testid="select-city"
      >
        {cities &&
          cities.length > 0 &&
          cities.map((city) => (
            <option key={city._id} value={city._id}>
              {city.name}
            </option>
          ))}
      </select>
    </form>
  );
};

SelectCity.propTypes = {
  cities: PropTypes.array,
  selectedCity: PropTypes.string,
  setSelectedCity: PropTypes.func,
};

export default SelectCity;
