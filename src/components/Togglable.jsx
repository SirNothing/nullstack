import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display : visible ? 'none' : '' }
  const showWhenVisible = { display : visible ? '' : 'none' }

  const handleVisible = () => {
    setVisible(!visible)
  }

  return( <>
    <div style={hideWhenVisible}>
      <button id='show' onClick={handleVisible} type='button' name='show'> {props.buttonLabel} </button>
    </div>
    <div style={showWhenVisible}>
      {props.children}
      <button onClick={handleVisible} type='button' name='hide'> Hide.. </button>
    </div>
  </> )
}
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
export default Togglable

