import { useState } from "react";


const PersonForm = ({ onAdd, persons  }) => {
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("")

    const addNewPerson = (event) => {
        event.preventDefault();
        if (persons.some((checkPerson) => checkPerson?.name === newName || checkPerson?.number === newNumber)) {
          return alert(`${newName || newNumber} is already added to phonebook`)
        }
    
        // if (persons.some(({name, number}) => name === newName || number === newNumber)) {
        //   alert(`${newName || newNumber} is already added to phonebook`)
        // }
    
        const personObject = {
          name: newName,
          number: newNumber,
          date: new Date().toISOString(),
          id: persons.length + 1,
        };

        setNewName("");
        setNewNumber("")
        onAdd(personObject);
      };
    return (
      <div>
      <form onSubmit={addNewPerson}>
        name: <input value={newName} onChange={(e => setNewName(e.target.value))} />
        <br></br>
        number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      </div>
    )
  }
  
  export default PersonForm