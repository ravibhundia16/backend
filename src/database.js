const { Sequelize } = require('sequelize')

let sequelize

const newConnection = () => {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      dialect: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    }
  )

  return sequelize
}

const init = () => {
  if (!sequelize) {
    sequelize = newConnection()
  }
  return sequelize
}

const connect = () => {
  sequelize.authenticate()
}

module.exports = {
  init,
  connect,
}
