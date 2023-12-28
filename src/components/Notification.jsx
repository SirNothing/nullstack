import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { message } from '../reducers/notifiReducer'

const Notification = () => {
  const notification = useSelector(state => state.notifi)
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if( notification !== '' ) {
    setTimeout(() => {
      dispatch(message(''))
    }, 5000)

    return (
      <div style={style}>
        {notification} 
      </div>
    )
  }else {
    return null
  }
}

export default Notification
