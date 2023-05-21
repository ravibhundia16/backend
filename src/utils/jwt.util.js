const jwt = require('jsonwebtoken')
const { logger } = require('./logger.util')

const createToken = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      // * Token expire time should be in hour in env files
      const expiresIn = Number(process.env.JWT_EXPIRE) * 60 * 60 * 1000

      // * JWT options for token
      const signOptions = {
        algorithm: process.env.JWT_ALGORITHM,
        expiresIn,
      }

      const token = jwt.sign({ userId: userId.toString() }, process.env.JWT_KEY, signOptions)

      resolve(token ? token : '')
    } catch (error) {
      reject(error)
    }
  })
}

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    const verifyOptions = {
      algorithms: [process.env.JWT_ALGORITHM],
    }

    jwt.verify(token, process.env.JWT_KEY, verifyOptions, (error, payload) => {
      if (error) {
        logger.error(`Error while verifying token`)
        logger.error(error)
        reject(error)
      } else {
        resolve(payload)
      }
    })
  })
}

module.exports = {
  createToken,
  verifyToken,
}
