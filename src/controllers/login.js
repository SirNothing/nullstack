const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body
  console.log(`pass and user: ${password} ${username}`)
  const user = await User.findOne({username})
  console.log(`userpass: ${user.body}`)
  const correctPass = user === null 
    ? false
    : await bcrypt.compare(password, user.password)
  
  if(!(user && correctPass)) {
    return res.status(400).json({message: "No user or incorrect pass"})
  }
  const webToken = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(webToken, process.env.SECRET)
  
  res.status(200).send({ token, username: user.username, name: user.name })

})

module.exports = loginRouter
