const Country = ({onShow, ...props}) => {
  const {
    name: { common },
    region,
  } = props;
  
  return (
    <div>
      <p>
        {common}: {region}{" "}
        <button onClick={() => onShow(props)}>show</button>
      </p>
    </div>
  );
};

export default Country;
