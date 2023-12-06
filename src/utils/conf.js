const dotenv = require('dotenv').config()

const DBURL = process.env.NODE_ENV === "test"
  ? process.env.TEST_DBURL
  : process.env.DBURL

const PORT = process.env.NODE_ENV === "test"
  ? process.env.TEST_PORT
  : process.env.PORT

module.exports = {
  DBURL,
  PORT
}
