import { useState } from "react";
import axios from "axios";
import personService from "../services/persons";
import { Button } from "@mui/material";

const PersonForm = ({ onAdd, persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const addNewPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    };

    // personService.create(personObject).then((returnedPerson) => {
    //   setPersons(persons.concat(returnedPerson));
    //   setNewName("");
    //   setNewNumber("");
    // });

    if (
      persons?.some(
        (checkPerson) =>
          checkPerson?.name === newName || checkPerson?.number === newNumber
      )
    ) {
      alert(`${newName || newNumber} is already added to phonebook`);
    } else {
      axios
        .post("http://localhost:8001/persons", personObject)
        .then((response) => {
          console.log(response);
          onAdd(response.data);
        });
      setNewName("");
      setNewNumber("");
    }
  };
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  return (
    <div style={{ fontSize: 30, marginTop: 40 }}>
      <form onSubmit={addNewPerson}>
        Name:{" "}
        <input
          style={{
            borderRadius: 10,
            width: 200,
            height: 40,
            textAlign: "center",
            boxSizing: "border-box",
            fontSize: 15,
            borderColor: "blue"
          }}
          placeholder='John Doe'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        &nbsp; Phone:{" "}
        <input
          style={{
            borderRadius: 10,
            width: 200,
            height: 40,
            textAlign: "center",
            boxSizing: "border-box",
            outline: "none",
            fontSize: 15,
            borderColor: "blue"

          }}
          type='tel'
          placeholder='305-206-2795'
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
          required
        />
        &nbsp;
        <Button
          sx={{ marginTop: 1 }}
          variant='outlined'
          color='error'
          type='submit'
        >
          add
        </Button>
      </form>
    </div>
  );
};

export default PersonForm;
