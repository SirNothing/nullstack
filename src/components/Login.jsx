import { useState, useEffect } from 'react'
import loginService from '../services/login'

const Login = ( { user, setUser, setMessage } ) => {
  console.log('Came to Login comp.')
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const getToken = await loginService.login(username, password)
      if (!getToken) {
        setMessage('Incorrect login..')
        setTimeout(() => {
          setMessage('')
        }, 3000)
      } else {
        setMessage(`${getToken.username} logged in!`)
        setTimeout(() => {
          setMessage('')
        }, 3000)
      }
      window.localStorage.setItem('user', JSON.stringify(getToken))
      console.log(`user logged: ${JSON.stringify(getToken)}`)
      setUser(getToken)
    }catch(error) {
      setMessage(error.message)
      setTimeout(() => {
        setMessage('')
      },3000)
    }
    setUsername('')
    setPassword('')
  }
  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('user')
    setUser(null)
    console.log(`logout: ${user}`)

  }
  if( user ) {
    return( <> <b> {user.username} is logged in...</b> <button id='logout' type='button' onClick={handleLogout}> Logout </button> </> )
  }
  return( <>
    <h2> Login to app.. </h2>
    <form onSubmit={handleSubmit}>
      <label>username
        <input type='text' id='username' name='username' value={username} onChange={ (e) => setUsername(e.target.value) } />
      </label>
      <label> password
        <input id='password' type='password' name='password' value={password} onChange={ (e) => setPassword(e.target.value) } />
      </label>
      <button id='submit-button' type='submit'> Login </button>
    </form>
  </> )
}
export default Login
