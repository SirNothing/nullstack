const Persons = ({persons, newFilter, handleDel}) => {
  return( <>
    <ul>
      { persons.filter( (per) => per.name.toLowerCase().includes(newFilter.toLowerCase() ))
        .map( (per) => {
          return(<li key={per.id}>
            {per.name} {per.number}
            <button onClick={() => handleDel(per.id)} name="delbutton" value={per.id} > delete </button>
          </li>) 
        })
      }
    </ul>
  </> )
}

export default Persons
