const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const url = process.env.MONGO_URL

mongoose.set('strictQuery', false)

try {
  mongoose.connect(url)
  .then(result => {
      console.log(`connected to server..`)
    })
}catch( error ) {
  console.log(`could not connect... ${error.message}`)
}

const phoneSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: v => {
        return /\d{2,3}-\d{7,8}/.test(v)
      },
      message: props => `${props.value} is not a valid number`
    },
    required: [ true, 'user phone number required']
  }
})


mongoose.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phone', phoneSchema)

