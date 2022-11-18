import { useEffect, useState } from "react";
import axios from "axios";
import FilterCountry from "./component/FilterCountry";
import Country from "./component/Country";
import OneCountry from "./component/OneCountry";
import Weather from "./component/Weather";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const themeDark = createTheme({
  palette: {
    background: {
      default: "#222222"
    },
    text: {
      primary: "black"
    }
  }
});


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

  return (
    <ThemeProvider theme={themeDark}>
    <div style={{textAlign: "center", backgroundColor: "lightsteelblue"}}>
      <h1>Country Filter 🌍</h1>
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
    </ThemeProvider>
  );
};

export default App;


// weather.weather[0].description && weather.wind.de