import { useState } from 'react'

const Notification = ({ message }) => {
  if( message === '' ) {
    return null
  }
  return( <div className='notification'>
    <b>Info: {message} </b>
  </div> )
}
export default Notification
