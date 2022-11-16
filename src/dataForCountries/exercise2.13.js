import { useEffect, useState } from "react";
// import Filter from "./component/Filter";
// import Person from "./component/Person";
// import PersonForm from "./component/PersonForm";
import axios from "axios";
import FilterCountry from "./component/FilterCountry";
import Country from "./component/Country";
import OneCountry from "./component/OneCountry";


const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(undefined);
  const [countries, setCountries] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    console.log("It started");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled", response.data);
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = searchKey
    ? countries.filter(({ name: { common } }) =>
        common.toUpperCase().includes(searchKey)
      )
    : countries;


  const OutputElement =
    filteredCountries.length === 1 ? (
      <OneCountry {...filteredCountries[0]} />
    ) : (
      <ul>
        {filteredCountries.map((country, idx) => (
          <Country key={idx} {...country} onShow={(country) => setSelectedCountry(country)} />
        ))}
      </ul>
    );

  return (
    <div>
      <h1 style={{ marginLeft: "50%" }}>Countries Filter 🌍</h1>
      <FilterCountry onSearch={setSearchKey} />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <>
          {OutputElement}
          {selectedCountry === 4 && <OneCountry {...selectedCountry} />}
        </>
      )}
    </div>
  );
};

export default App;
