import { useReducer } from 'react'
import { useContext } from 'react'
import NotifContext from '../notifContext'


const Notification = () => {
const [ notif, notifDispatch] = useContext(NotifContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notif !== '') {
    setTimeout(() => {
      notifDispatch({type: 'reset'})
    }, 5000)
  }else {
    return null
  } 

  return (
    <div style={style}>
      {notif}
    </div>
  )
}

export default Notification
