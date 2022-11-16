import { useState } from "react";

const Filter = ({ onAdd, persons }) => {
  const [show, setShow] = useState("");

  const handleListSearch = ({ target: { value } }) => {
    console.log(value);
    const upperValue = value.toUpperCase();
    const notesToShow =
      value.length > 0
        ? persons.filter(
            ({ name, number }) =>
              name.toUpperCase().includes(upperValue) ||
              number.includes(value) ||
              number.replace(/-/g, "").includes(value)
          )
        : persons;
    onAdd(notesToShow);
    setShow(value);
  };

  return (
    <div>
      <div>
        Filter shown with <input value={show} onChange={handleListSearch} />
      </div>
    </div>
  );
};

export default Filter;
