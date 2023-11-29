import Country from './Country'
import Weather from './Weather'

const Countries = ({ filter, handleButton, weather }) => {
  if( filter.length === 1 ) {

    return(<>
      <h2> {filter[0].name.common} </h2>
      <b>Capital:</b> {filter[0].capital[0]}
      <b>   Area: </b> {filter[0].area} <br />
      <ul>
        <b>Languages: </b> {Object.values(filter[0].languages).map(val => <li> {val} </li> )} <br />
      </ul>
      <img src={filter[0].flags.png} alt="Flag of the country" /> <br />
      <h3> Weather in {filter[0].capital[0]} </h3>
      <Weather weather={weather} />  
    </>)
  }
  if( filter.length > 1 && filter.length < 10 ) {

    return(<>
      <h2> Countries: </h2><br />
        { filter.map(count => {
            return(
              <Country key={count.ccn3} country={count.name.common} handleButton={handleButton} ccn={count.ccn3} />
            )
          })
        }
    </>)
  }else {

    return(<> <p> More filters to get results </p> </>)
  }
}
export default Countries
