import { useState } from "react";
import axios from "axios";
// import personService from './services/persons'

const PersonForm = ({ onAdd, persons, setPersons, personService }) => {
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

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });

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
  const handlePersonChange = (event) => {
    setNewName(event.target.value);
    setNewNumber(event.target.value);
  };
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  return (
    <div>
      <form onSubmit={addNewPerson}>
        name:{" "}
        <input
          placeholder='John Doe'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <br></br>
        number:{" "}
        <input
          type='tel'
          placeholder='305-206-2795'
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)} //onChange={handlePersonChange}
          required
        />
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
