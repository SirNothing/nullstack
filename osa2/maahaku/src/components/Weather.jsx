const Weather = ({weather}) => {

  const iconUrl = 'https://openweathermap.org/img/wn/'

  if( weather.main ) {

    return(<>
      <b> Temperature: </b> { weather.main.temp } Celcius <br />
      <img src={`${iconUrl}${weather.weather[0].icon}@2x.png`} alt="weather icon" /> <br />
      <b> wind: </b> {weather.wind.speed} m/s
    </>)
  } else {

    return null
  }
}
export default Weather
