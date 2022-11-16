import { useState } from "react";

const FilterCountry = ({ onSearch, name }) => {
  const [show, setShow] = useState("");
  const handleListSearch = ({ target: { value } }) => {
    const upperValue = value.toUpperCase();
    onSearch(upperValue);
    setShow(value);
  };

  return (
    <div>
      <div>
        Find Countries <input value={show} onChange={handleListSearch} />
      </div>
    </div>
  );
};

export default FilterCountry;
