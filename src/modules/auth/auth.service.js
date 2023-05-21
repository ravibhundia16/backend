const { logger } = require('../../utils')
const { User } = require('../../models')

const findAll = (query) => {
  return new Promise((resolve, reject) => {
    try {
      logger.info('# AuthService -> findAll start')

      const result = User.findAll(query)

      resolve(result)
    } catch (error) {
      logger.error('# Error while find user query: AuthService -> findAll -> catch:')
      logger.error(error)
      reject(error)
    }
  })
}

const findOne = (query) => {
  return new Promise((resolve, reject) => {
    try {
      logger.info('# AuthService -> findOne start')

      const result = User.findOne(query)

      resolve(result)
    } catch (error) {
      logger.error('# Error while find user query: AuthService -> findOne -> catch:')
      logger.error(error)
      reject(error)
    }
  })
}

module.exports = {
  findAll,
  findOne,
}
