const Filter = ({handleFilter, newFilter}) => {
  return( <>
    <p> filter showing with </p> <input onChange={handleFilter} name="filter" value={newFilter} />

  </> )
}

export default Filter
