const User = require('../models/user')
const jwt = require('jsonwebtoken')

const userExtractor = (req, res, next) => {
  if( req.token ) {
    const user = jwt.verify(req.token, process.env.SECRET)
      if( user ) {
        req.user = user
        console.log(`middleware user ${user}`)
    }
  }
  next()
}

module.exports = userExtractor
