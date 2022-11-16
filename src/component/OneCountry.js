const OneCountry = ({ name: {common}, capital, area, languages, flags  }) => {
    return (
      <div>
      <h2>{common}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h4>Languages:</h4>
      <ul>
        {Object.values(languages).map((lang) => (<li key={lang}>{lang}</li>))}
      </ul>
        <h1><img src={flags?.png} alt="img"  /></h1>
      </div>
    )
  }
  
  export default OneCountry


 
