import { createContext, useReducer} from "react"

const notifReducr = (state, action) => {
  switch(action.type) {
    case 'vote':
      return state = `Voted for: ${action.message}`
    case 'anecdote':
      return state = `added anec: ${action.message}`
    case 'error':
      return state = `Error: ${action.message}`
    case 'reset':
      return state = ''
    default:
      return state
  }
}

const NotifContext = createContext()

export const NotifContextProvider = (props) => {
  const [notif, notifDispatch] = useReducer(notifReducr, '')

  return(<>
    <NotifContext.Provider value={[notif, notifDispatch]} >
      {props.children}
    </NotifContext.Provider> 
  </>)
}

export default NotifContext
