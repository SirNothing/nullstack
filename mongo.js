const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

if( process.argv.length < 3 || process.argv.length > 5 || process.argv.length === 4 ) {
  console.log(`wrong set of parameters, 3 or 5 needed: ${process.argv.length}`)
  process.exit()
}

dbUrl = "????"

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phone = mongoose.model('Phone', phoneSchema)

if( process.argv.length === 3 ) {
  try {
    mongoose.set('strictQuery', false)
    mongoose.connect(url)

    Phone.find({}).then(res => {
      console.log(`Phonebook:`)
      res.forEach(num => {
        console.log(` ${num.name} ${num.number}`)
      })
      mongoose.connection.close()
      process.exit()
    })
  }catch(error) {
    console.log(`Couldn't connect ${error.message}`)
  }
}

if( process.argv.length === 5 ) {
  try {
    mongoose.set('strictQuery', false)
    mongoose.connect(url)
    newPhone = new Phone({
      name: process.argv[3],
      number: process.argv[4]
    })
    newPhone.save().then(res => {
      console.log(`Added ${res.name} number ${res.number} to phonebook`)
      mongoose.connection.close()
      process.exit()
    })
  }catch( error ) {
    console.log(`could not add ${newPhone} ${error.message}`)
  }
}
