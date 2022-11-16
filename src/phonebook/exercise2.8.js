import { useState } from "react";
import Person from "./component/Person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault();
    console.log(persons);
    if (persons.some((checkPerson, checkNumber) => checkPerson?.content === newName || checkNumber?.phoneNumber === newNumber)) {
      alert(newName || newNumber + " " + 'is already added to phonebook')
    }

    const personObject = {
      content: newName,
      phoneNumber: newNumber,
      date: new Date().toISOString(),
      id: persons.length + 1,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("")
  };

  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        name: <input value={newName} onChange={handlePersonChange} />
        <br></br>
        number: <input value={newNumber} onChange={handleNumberChange} />
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default App;
