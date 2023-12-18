const tokenExtractor = (req, res, next) => {
const token = req.get('Authorization')
  console.log(`req_token: ${token}`)
  if( token && token.startsWith('Bearer') ) {
    req.token = token.replace('Bearer ', '')
  }else {
    req.token = null
  }
  next()
}

module.exports = tokenExtractor
