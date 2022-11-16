import { useEffect, useState } from "react";
import axios from "axios";
import FilterCountry from "./component/FilterCountry";
import Country from "./component/Country";
import OneCountry from "./component/OneCountry";
import Weather from "./component/Weather";

const App = () => {
  const [weather, setWeather] = useState(undefined);
  const [selectedCountry, setSelectedCountry] = useState(undefined);
  const [countries, setCountries] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const filteredCountries = searchKey
    ? countries.filter(({ name: { common } }) =>
        common.toUpperCase().includes(searchKey)
      )
    : countries;

  useEffect(() => {
    console.log("It started");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled", response.data);
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCountry.latlng[0]}&lon=${selectedCountry.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then((response) => {
          setWeather(response.data);
        });
    }
  }, [selectedCountry]);

  console.log("weather", weather);
  // const api_key = process.env.REACT_APP_API_KEY

  return (
    <div>
      <h1 style={{ marginLeft: "50%" }}>Countries Filter 🌍</h1>
      <FilterCountry
        onSearch={(key) => {
          setSearchKey(key);
          const filteredCountries = key
            ? countries.filter(({ name: { common } }) =>
                common.toUpperCase().includes(key)
              )
            : countries;
          if (filteredCountries.length === 1) {
            setSelectedCountry(filteredCountries[0]);
          }
        }}
      />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <>
          {filteredCountries.length !== 1 &&
            filteredCountries.map((country, idx) => (
              <Country
                key={idx}
                {...country}
                onShow={(country) => setSelectedCountry(country)}
              />
            ))}
          {selectedCountry && <OneCountry {...selectedCountry} />}
          {weather && <Weather {...weather} />}
        </>
      )}
    </div>
  );
};

export default App;


// weather.weather[0].description && weather.wind.de