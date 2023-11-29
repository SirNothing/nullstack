import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const API_KEY = import.meta.env.VITE_API_KEY

const App = () => {

  const [ search, setSearch ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState([])
  const [ weather, setWeather ] = useState({})
  const [ searchWeather, setSearchWeather ] = useState("")

  useEffect( () => {

    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    request.then(resp => resp.data)
    .then(data => setCountries( data))
      .catch(error => console.log(error.message))
  }, [])
  
  useEffect( () => {
    
    if( searchWeather !== "" ) {
      console.log(`Minkä weather haetaan: ${searchWeather}`)
      const request = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${searchWeather}&limit=1&appid=${API_KEY}`)
        request.then( resp => axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${resp.data[0].lat}&lon=${resp.data[0].lon}&appid=${API_KEY}&units=metric`))
          .then(resp => resp.data).then(data => setWeather(data))
      .catch(error => console.log(`errorii weather haus: ${error.message}`))
    }
  }, [ searchWeather ])

  const handleSearch = (e) => {
    e.preventDefault()

    setSearch(e.target.value)
    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilter(filtered)

    if( filtered.length === 1 ) {
      setSearchWeather(filtered[0].capital[0])
    }
  }

  const handleButton = (e, ccn) => {
    e.preventDefault()

    const country = countries.filter(count => count.ccn3 === ccn)
    setFilter(country)
    setSearchWeather(country[0].capital[0])
  }

  return( <>
    <h1> Countries of the free world... </h1>
    <p> Search countries </p><input onChange={handleSearch} value={search} name="search" />
    <Countries filter={filter} handleButton={handleButton} weather={weather} />
  </> )
}

export default App
