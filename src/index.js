const app = require('./app')
const conf = require('./utils/conf')

const PORT = conf.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

