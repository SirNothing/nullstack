const errorHandler = (error, request, response, next) => {
  console.log(`error: ${error.message}`)
  if( error.name === 'CastError' ) {
    return response.status(400).send({ error: 'Malformed id'})
  }else if( error.name === 'ValidationError') {
    console.log(`Tääl errorii testeihi?`)
    return response.status(400).json({ error: error.message })
  }else if( error.name === 'JsonWebTokenError' ) {
    return response.status(400).json({ error: 'token missing or invalid' })
  }

  next(error)
}

module.exports = errorHandler
