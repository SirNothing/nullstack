import { setFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {

  const dispatch = useDispatch()

  const handleChange = (e) => {
    console.log(`handleButton filter: ${e.target.value}`)
    dispatch(setFilter(e.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={(e) => handleChange(e)} type='text' name='filter' />
    </div>
  )
}

export default Filter
