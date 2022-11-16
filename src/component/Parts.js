

const Parts = ({ name: partName, exercises, id }) => {
    return (
      <div>
        <div key={id}>{partName} {exercises}</div>    
      </div>
    )
    
  }

  export default Parts

  