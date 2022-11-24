
const Person = ({ person, onDelete, toggleImportance  }) => {
  const label = person.important
  ? 'make not important' : 'make important'

//* Will make the first letter of each Persons name a CAPITAL letter
  // const capitalized =
  // person.name.charAt(0).toUpperCase()
  // + person.name.slice(1)


   //* Will return persons name capitalized + their number. Will also add a Delete button and an Important button
    return (
      <div>
      <p>{person.name} ~ {person.number} <button onClick={() => onDelete?.(person.id)}>Del</button> <button onClick={toggleImportance}>{label}</button> </p>
      </div>
    )
  }

  
  export default Person
