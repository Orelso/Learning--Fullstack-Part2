const Weather = ({name, weather: [{ main, description, icon }], wind: {speed, deg, gust}}) => {
  return (
    <div>
        <h1>Weather in {name}</h1>
      <p>{description}</p>
      <img
        src={
          icon ? `http://openweathermap.org/img/wn/${icon}@2x.png` : undefined
        }
        alt={main}
      />
      <p>Speed: {speed}</p>
      <p>Deg: {deg}</p>
      <p>Gust: {gust}</p>
    </div>
  );
};

export default Weather;
