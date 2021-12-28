import React from "react";

const SelectCity = (props) => {
  const { cities, selectedCity, setSelectedCity } = props;

  return (
    <form>
      <select
        class="form-select"
        aria-label="Available bikes"
        onChange={(event) => setSelectedCity(event.target.value)}
      >
        {cities &&
          cities.length > 0 &&
          cities.map((city) => (
            <option selected={selectedCity === city._id} value={city._id}>
              {city.name}
            </option>
          ))}
      </select>
    </form>
  );
};

export default SelectCity;
