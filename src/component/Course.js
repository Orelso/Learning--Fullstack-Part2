
import Content from './Content'
import Total from './Total'


const Course = ({ name, parts }) => {
    return (
      <div>
      <h2>{name}</h2>
      <div>{parts.map((course, id) => (<Content key={id}  {...course} />))}</div> 
      <h4 style={{color: "orange"}}>{<Total name={name} parts={parts} />}</h4>
      </div>
    )
    
  }

  export default Course

