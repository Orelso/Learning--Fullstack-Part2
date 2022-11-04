

const Course = ({ course }) => {
    return (
      <div>
        <h1><b>Web development curriculum</b></h1>
      <h2>{course[0].name}</h2>
      <p>{course[0].parts[0].name} {course[0].parts[0].exercises}</p>
      <p>{course[0].parts[1].name} {course[0].parts[1].exercises}</p>
      <p>{course[0].parts[2].name} {course[0].parts[2].exercises}</p>
      <p>{course[0].parts[3].name} {course[0].parts[3].exercises}</p>
      <p><b>Total of {course[0].parts[0].exercises + course[0].parts[3].exercises + course[0].parts[1].exercises + course[0].parts[2].exercises} exercises</b></p>

      <h2>{course[1].name}</h2>
      <p>{course[1].parts[0].name} {course[1].parts[0].exercises}</p>
      <p>{course[1].parts[1].name} {course[1].parts[1].exercises}</p>
      <p><b>Total of {course[1].parts[0].exercises + course[1].parts[1].exercises } exercises</b></p>



      </div>
    )
  }

  export default Course