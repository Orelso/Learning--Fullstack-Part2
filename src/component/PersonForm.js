import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const PersonForm = ({ onAdd, persons, onReplace, setUpdatedMessage  }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const addNewPerson = async (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
    };
    /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

    const nameExists = persons?.find((checkPerson) => {
      return checkPerson?.name === newName;
    });
    /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    if (nameExists && nameExists?.number === newNumber) {
      alert(`${newName + " " + newNumber} is already added to phonebook`);
    } else if (nameExists) {
      if (window.confirm("Replace number?")) {
        return axios
          .put(`http://localhost:8001/persons/${nameExists.id}`, personObject)
          .then((response) => {
            // console.log(response);
            const indexUpdatedNumber = persons.findIndex(
              (person) => person.id === nameExists.id
            ); 
            console.log(indexUpdatedNumber);
            let existingPersons = [...persons];
            existingPersons.splice(indexUpdatedNumber, 1, response.data);
            console.log(existingPersons);
            onReplace(existingPersons);
            let Bletter = `${response.data.name}'s  phone number has been updated`
            setUpdatedMessage({msg: Bletter.toUpperCase(), type: 'greenBorder'})

          })
      }
    } else {
      axios
        .post("http://localhost:8001/persons", personObject)
        .then((response) => {
          console.log(response);
          onAdd(response.data); //* UI
          setUpdatedMessage({msg:`'${response.data.name}' has been added`, type: 'greenBorder'})
          setTimeout(() => {
            setUpdatedMessage(null)
          }, 4000)
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
            borderColor: "blue",
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
            borderColor: "blue",
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


