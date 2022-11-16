import { useState } from "react";
import Filter from "./component/Filter";
import Person from "./component/Person";
import PersonForm from "./component/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [notesToShow, setNotesToShow] = useState(persons)



 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onAdd={setNotesToShow} persons={persons} />
      <h2>Add a new Person</h2>
      <PersonForm onAdd={(personObject) => setPersons(persons.concat(personObject))} persons={persons} />
      <h2>Numbers</h2>
      <ul>
        {notesToShow.map(person =>
          <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  );
};

export default App;
