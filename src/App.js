import { useEffect, useState } from "react";
import Filter from "./component/Filter";
import Person from "./component/Person";
import PersonForm from "./component/PersonForm";
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([]);
  const [notesToShow, setNotesToShow] = useState(persons)
  // const [newPerson, setNewPerson] = useState()
  const [showAll, setShowAll] = useState(true)

  const toggleImportanceOf = id => {
    const url = `http://localhost:8001/persons/${id}`
    const person = persons.find(n => n.id === id)
    const changedPerson = { ...person, important: !person.important }
  
    axios.put(url, changedPerson).then(response => {
      setPersons(persons.map(n => n.id !== id ? n : response.data))
    })
  }
    
    // console.log(`importance of ${id} needs to be toggled`)
  

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:8001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setPersons(persons.concat(response.data))
      })
  }, [])

  const handleDelete = async (id) => {
    console.log("tete", persons)
    await fetch('http://localhost:8001/persons/' + id, {
        method: 'DELETE'
    })
    const newPerson = persons.filter(person => person.id !== id)
    setPersons(newPerson)
  }
  

  // const handlePersonChange = (event) => {
  //   setNewPerson(event.target.value)
  // }
 
  useEffect(() => {
    setNotesToShow(persons)
  },[persons] );



  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div> 
      
      <Filter onAdd={setNotesToShow} persons={persons} />
      <h2>Add a new Person</h2>
      <PersonForm onAdd={(personObject) => setPersons(persons.concat(personObject))} persons={persons} />
      <h2>Numbers</h2>
      <ul>
        {notesToShow.map(person =>
          <Person key={person.id} person={person} onDelete={() => handleDelete(person.id)} toggleImportance={() => toggleImportanceOf(person.id)}/>
        )}
      </ul>
      {/* <form onSubmit={addPerson}>
      <input
          value={newPerson}
          onChange={handlePersonChange}
        />
        <button type="submit">save</button>
      </form> */}
    </div>
  );
};

export default App;
