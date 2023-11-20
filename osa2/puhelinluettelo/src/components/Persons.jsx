const Persons = ({persons, newFilter}) => {
  return( <>
  <ul>
    { persons.filter( (per) => per.name.toLowerCase().includes(newFilter.toLowerCase() ))
      .map( (per, i) => <li key={i}> {per.name} {per.phone} </li> ) }
  </ul>
      </> )

}
export default Persons
