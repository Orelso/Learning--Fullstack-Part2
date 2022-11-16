import { useState } from "react";

const FilterWeather = ({ onSearch, name }) => {
  const [weather, setWeather] = useState("");
  const handleFilterWeather = ({ target: { value } }) => {
    const upperValue = value.toUpperCase();
    onSearch(upperValue);
    setWeather(value);
  };

  return (
    <div>
      <div>
        Find Countries Weather <input value={weather} onChange={handleFilterWeather} />
      </div>
    </div>
  );
};

export default FilterWeather;
