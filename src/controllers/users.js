const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({})
    res.status(200).json(users)
  }catch(error) {
    next(error)
  }
})

// userRouter.post('/', async (request, response) => {
//   console.log(`args coming: ${JSON.stringify(request.body)}`)
//   response.status(203).json(request.body)
// })

 userRouter.post('/', async (request, res, next) => {
   console.log(`req.boody :${JSON.stringify(request.body)}`)
   console.log(`headerit : ${JSON.stringify(request.headers)}`)
   const { username, name, password } = request.body
   if( password.length <= 3 ) {
    res.status(400).send({message: `need more than 3 chars for pass...`})
    return null 
  }
  console.log(`adding user: ${username} ${password}`)
  const salt = 10 
  const passwordHash = await bcrypt.hash(password, salt)
  try{
    const foundPerson = await User.findOne({username})
    if( foundPerson ) {
      res.status(400).send({ message: "Allready found" })
    }else {
      const addPerson = new User({
        username: username,
        name: name,
        password: passwordHash
      })
      const result = await addPerson.save()
      res.status(201).json(result.body)
    }
  }catch(error) {
    next(error)
  }
})

module.exports = userRouter
