
const Total = ({ parts }) => {
    return (
      <div>
        <h3>Total of {parts.reduce((last, current) => last + current.exercises, 0)} exercises</h3>
      </div>
    )
  }

  export default Total






