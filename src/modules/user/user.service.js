const { logger } = require('../../utils')
const { User } = require('../../models')

const create = async (user) => {
  try {
    logger.info('# UserService -> create start')

    const result = await User.create(user)

    return result
  } catch (error) {
    logger.error('# Error while create user query: UserService -> create -> catch:')
    logger.error(error)
    throw error
  }
}

const update = (query, user) => {
  return new Promise((resolve, reject) => {
    try {
      logger.info('# UserService -> update start')

      const result = User.update(user, query)

      resolve(result)
    } catch (error) {
      logger.error('# Error while update user query: UserService -> update -> catch:')
      logger.error(error)
      reject(error)
    }
  })
}

const findAll = (query) => {
  return new Promise((resolve, reject) => {
    try {
      logger.info('# UserService -> findAll start')

      const result = User.findAll(query)

      resolve(result)
    } catch (error) {
      logger.error('# Error while find user query: UserService -> findAll -> catch:')
      logger.error(error)
      reject(error)
    }
  })
}

const destroy = (query) => {
  return new Promise((resolve, reject) => {
    try {
      logger.info('# UserService -> destroy start')

      const result = User.destroy(query)

      resolve(result)
    } catch (error) {
      logger.error('# Error while delete user query: UserService -> destroy -> catch:')
      logger.error(error)
      reject(error)
    }
  })
}

module.exports = {
  create,
  update,
  findAll,
  destroy,
}
