import { useState } from 'react'


const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display : visible ? 'none' : '' }
  const showWhenVisible = { display : visible ? '' : 'none' }

  const handleVisible = () => {
    setVisible(!visible)
  }

  return( <>
    <div style={hideWhenVisible}>
      <button onClick={handleVisible} type='button' name='show'> {props.buttonLabel} </button>
    </div>
    <div style={showWhenVisible}>
      <p> {props.children} </p>
      <button onClick={handleVisible} type='button' name='hide'> Hide.. </button>
    </div>
  </> )
}
export default Togglable
