const mongoose = require('mongoose')
const { logger } = require('./utils')

const connect = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      logger.info('Database connected successfully')
    })
    .catch((error) => {
      logger.error(`Error while connnecting to database: ${error}`)
    })
}

module.exports = {
  connect,
}
