import { useEffect, useState } from "react";
import Filter from "./component/Filter";
import Person from "./component/Person";
import PersonForm from "./component/PersonForm";
import axios from "axios";
import personService from "./services/persons";
import Divider from '@mui/material/Divider';
import { Button } from "@mui/material";
import { blue } from "@mui/material/colors";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [personsToShow, setPersonsToShow] = useState(persons);
  // const [newPerson, setNewPerson] = useState()
  const [showAll, setShowAll] = useState(true);
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const toggleImportanceOf = (id) => {
    const person = persons.find((n) => n.id === id); //* used to find the person we want to modify and we assign it to the person variable
    const changedPerson = { ...person, important: !person.important }; //* After this we create a new object that is an exact copy of the old person, apart from the important property.

    personService
      .update(id, changedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        ); //* The callback function sets the component's persons state to a new array that contains all the items from the previous persons array, except for the old person which is replaced by the updated version of it returned by the server:
      }) //* The map method creates a new array by mapping every item from the old array into an item in the new array. In our example, the new array is created conditionally so that if person.id !== id is true; we simply copy the item from the old array into the new array. If the condition is false, then the person object returned by the server is added to the array instead.
      .catch((error) => {
        alert(`the note '${person.name}' was already deleted from server`);
        setPersons(persons.filter((n) => n.id !== id));
      });
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
    await fetch("http://localhost:8001/persons/" + id, {
      method: "DELETE",
    });
    // if(window.confirm("yo")) {
    //   window.open("open")
    //   window.close("close")
    // }
    const newPerson = persons.filter((person) => person.id !== id);
    setPersons(newPerson);
  };
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  useEffect(() => {
    setPersonsToShow(persons);
  }, [persons]);
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const personToShow = showAll
  ? personsToShow
  : personsToShow.filter(person => person.important)

  return (
    <div style={{textAlign: "center"}}>
      <h1 style={{fontSize: 100}}>☏ Phonebook ☎</h1>
      <Filter onAdd={setPersonsToShow} persons={persons} />
      {/* <h2 style={{marginTop: 40}}><i style={{color: "blue"}}>Add Contact</i></h2> */}
      <PersonForm
        onAdd={(personObject) => setPersons(persons.concat(personObject))}
        persons={persons}
        setPersons={setPersons}
      />
      
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
