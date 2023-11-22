const Notification = ({message, setMessage}) => {
  const style = {
    color: 'red',
    border: 'solid',
    fontSize: 20,
    padding: 5,
    margin: 10
  }
    if( message === null ) {
    return null
  }
  setTimeout(() => {
    setMessage(null)
  }, 2000)

  return( <div style={style}>
    <b> {message} </b> 
  </div> )
}

export default Notification
