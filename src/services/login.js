import axios from 'axios'

const baseUrl = 'http://localhost:3002/api/login'

const login = async ( username, password ) => {
  try {
    const token = await axios.post(baseUrl, { username: username, password: password })
    console.log(`token: ${typeof token} and ${JSON.stringify(token.data.token)}`)
    return token.data
  }catch(error) {
    return null
  }
}

export default { login }

