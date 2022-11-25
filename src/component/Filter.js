import { useState } from "react";

const Filter = ({ onAdd, persons }) => {
  const [show, setShow] = useState("");
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const handleListSearch = ({ target: { value } }) => {
    console.log(value);
    const upperValue = value.toUpperCase();
    const personsToShow =
      value.length > 0
        ? persons.filter(
            ({ name, number }) =>
              name.toUpperCase().includes(upperValue) ||
              number.includes(value) ||
              number.replace(/-/g, "").includes(value)
          )
        : persons;
    onAdd(personsToShow);
    setShow(value);
  };
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  return (
    <div>
      <div style={{fontSize: 30, marginTop: -80}}>
        Search{" "}
        <input
          style={{
            borderRadius: 10,
            width: 500, 
            height: 40,
            textAlign: "center",
            boxSizing: "border-box",
            outline: "none",
            fontSize: 20,
          }}
          placeholder='........'
          value={show}
          onChange={handleListSearch}
        />
      </div>
    </div>
  );
};

export default Filter;
