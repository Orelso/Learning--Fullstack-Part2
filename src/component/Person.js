
const Person = ({ person, onDelete, toggleImportance  }) => {
  const label = person.important
  ? 'make not important' : 'make important'

// 
  const capitalized =
  person.name.charAt(0).toUpperCase()
  + person.name.slice(1)


   //
    return (
      <div>
      <p>{capitalized} ~ {person.number} <button onClick={() => onDelete?.(person.id)}>Del</button> <button onClick={toggleImportance}>{label}</button> </p>
      </div>
    )
  }

  
  export default Person
