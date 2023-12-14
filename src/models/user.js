const mongoose = require('mongoose')
const uniqValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 4,
    unique: true
    
  },
  name: String,
  password: {
    type: String,
    required: true,
  } 
})

userSchema.plugin(uniqValidator)

const User = mongoose.model('User', userSchema)

userSchema.set('toJSON', {
  transform: (docuemnt, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = User
