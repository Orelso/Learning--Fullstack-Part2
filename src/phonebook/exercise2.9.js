import { useState } from "react";
import Person from "./component/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("")
  const [show, setShow] = useState('')


  const addNewPerson = (event) => {
    event.preventDefault();
    console.log(persons);
    if (persons.some((checkPerson) => checkPerson?.name.toUpperCase() === newName || checkPerson?.number === newNumber)) {
      alert(`${newName || newNumber} is already added to phonebook`)
    }

    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      id: persons.length + 1,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("")
    setShow("")

  };

  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleListSearch = (event) => {
    setShow(event.target.value)
  }
  const notesToShow = show.length > 0? persons.filter((person) => person.name.toUpperCase().match(show.toUpperCase()) || person.number.match(show)) : persons


  return (
    <div>
      <h2>Phonebook</h2>
      Filter shown with <input value={show} onChange={handleListSearch} />
      <h2>Add a new Person</h2>
      <form onSubmit={addNewPerson}>
        name: <input value={newName} onChange={handlePersonChange} />
        number: <input value={newNumber} onChange={handleNumberChange} />

        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {notesToShow.map(person => 
          <Person key={person.id} person={person} />
        )}
      </div>
    </div>
  );
};

export default App;
