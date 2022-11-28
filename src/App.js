import { useEffect, useState } from "react";
import Filter from "./component/Filter";
import Person from "./component/Person";
import PersonForm from "./component/PersonForm";
import axios from "axios";
import personService from "./services/persons";
import Divider from '@mui/material/Divider';
import { Button } from "@mui/material";
import Notification from "./component/Notification";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [personsToShow, setPersonsToShow] = useState(persons);
  const [showAll, setShowAll] = useState(true);
  const [updateMessage, setUpdateMessage] = useState({msg: '', type: ''})

  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const toggleImportanceOf = id => {
    const person = persons.find(n => n.id === id); //* used to find the person we want to modify and we assign it to the person variable
    const changedPerson = { ...person, important: !person.important }; //* After this we create a new object that is an exact copy of the old person, apart from the important property.

    personService
      .update(id, changedPerson).then(returnedPerson => { //* The callback function sets the component's persons state to a new array that contains all the items from the previous persons array, except for the old person which is replaced by the updated version of it returned by the server:
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson)) //* The map method creates a new array by mapping every item from the old array into an item in the new array. In our example, the new array is created conditionally so that if person.id !== id is true; we simply copy the item from the old array into the new array. If the condition is false, then the person object returned by the server is added to the array instead.
        setUpdateMessage({msg:`Person '${person.name}' removed from important list`})
        setTimeout(() => {
          setUpdateMessage(null)
        }, 1500)
      }) 

  };
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:8001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
      setPersons(persons.concat(response.data));
    });
  }, []);
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const handleDelete = async (id) => {
    console.log("checkDELETE", persons);
    const removePerson = persons.find((person) => person.id === id); //* Adds name to the window.confirm 
    if(window.confirm(`Are you sure you want to delete ${removePerson.name.charAt(0).toUpperCase()+ removePerson.name.slice(1)}`)) { 
      await fetch("http://localhost:8001/persons/" + id, { //* Backend 
        method: "DELETE",
      });
      const newPerson = persons.filter((person) => person.id !== id); //* UI 
       setPersons(newPerson); 
       setUpdateMessage({msg:`Person '${removePerson.name}' has been deleted`})
        setTimeout(() => {
              setUpdateMessage(null)
            }, 4000)
    } 
  };
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  useEffect(() => {
    setPersonsToShow(persons);
  }, [persons]);
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const personToShow = showAll
  ? personsToShow
  : personsToShow.filter(person => person.important)
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  return (
    <div style={{textAlign: "center"}}>
      <h1 style={{fontSize: 100}}>☏ Phonebook ☎</h1>
      <Filter onAdd={setPersonsToShow} persons={persons} />
      <PersonForm
        onAdd={(personObject) => setPersons(persons.concat(personObject))}
        onReplace={(newPersons) => setPersons(newPersons)}
        setUpdatedMessage={(updateMessage) => setUpdateMessage(updateMessage)}
        persons={persons}
      />
        {(updateMessage) && <Notification message={updateMessage} />}
        <Button sx={{marginTop: 4}} variant="outlined" onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important Contacts" : "all contacts"}
        </Button>
      <Divider />
      <ul>
        {personToShow.map((person) => (
          <Person
            key={person.id}
            person={person}
            onDelete={() => handleDelete(person.id)}
            toggleImportance={() => toggleImportanceOf(person.id)}
          />
        ))}
      </ul> 
    </div>
  );
};

export default App;
