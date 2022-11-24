import Button from '@mui/material/Button';
import { pink } from '@mui/material/colors';


const Person = ({ person, onDelete, toggleImportance }) => {
  const label = person.important ? <i style={{color: "red"}}>Important</i> : <i>not important</i>
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

  //* Will make the first letter of each Persons name a CAPITAL letter
  const capitalized =
  person.name.charAt(0).toUpperCase()
  + person.name.slice(1)
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  //* Will return persons name capitalized + their number. Will also add a Delete button and an Important button
  return (
    <div>
      <p style={{fontSize: 25}}>
        {capitalized} ~ {person.number}{" "}
        <Button variant="contained" onClick={() => onDelete?.(person.id)}>Del</Button>{" "}
        <Button variant="outlined" onClick={toggleImportance}>{label}</Button>{" "}
      </p>
    </div>
  );
};

export default Person;
