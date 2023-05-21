const constants = require('../../constants/constants')
const messages = require('../../constants/messages')
const userService = require('./user.service')
const { logger, successResponse, errorResponse } = require('../../utils')

const addUser = async (req, res) => {
  try {
    logger.info('# UserController -> addUser start')

    // * Create user
    const userRes = await userService.create(req.body)

    return res
      .status(constants.HTTP_STATUS_CODE_201)
      .json(successResponse(constants.HTTP_STATUS_CODE_201, userRes, messages.SUCCESS_USER_CREATE))
  } catch (error) {
    logger.error('# Error while adding user in UserController -> addUser -> catch:')
    logger.error(error)
    return res
      .status(constants.HTTP_STATUS_CODE_500)
      .json(errorResponse(constants.HTTP_STATUS_CODE_500, error, messages.ERROR_WHILE_USER_CREATE))
  }
}

const updateUserById = async (req, res) => {
  try {
    logger.info('# UserController -> updateUserById start')

    // * Update user detail
    const query = {
      where: {
        id: req.params.userid,
        isDeleted: false,
      },
    }

    const updatedUser = await userService.update(query, req.body.user)

    return res
      .status(constants.HTTP_STATUS_CODE_200)
      .json(
        successResponse(constants.HTTP_STATUS_CODE_200, updatedUser, messages.SUCCESS_USER_UPDATE)
      )
  } catch (error) {
    logger.error('# Error while adding user in UserController -> updateUserById -> catch:')
    logger.error(error)
    return res
      .status(constants.HTTP_STATUS_CODE_500)
      .json(errorResponse(constants.HTTP_STATUS_CODE_500, error, messages.ERROR_WHILE_USER_UPDATE))
  }
}

const getUserById = async (req, res) => {
  try {
    logger.info('# UserController -> getUserById start')

    // * Get user detail
    const query = {
      where: {
        id: req.params.userid,
        isDeleted: false,
      },
    }

    const user = await userService.findAll(query)

    return res
      .status(constants.HTTP_STATUS_CODE_200)
      .json(successResponse(constants.HTTP_STATUS_CODE_200, user, messages.SUCCESS_USER_FETCH))
  } catch (error) {
    logger.error('# Error while adding user in UserController -> getUserById -> catch:')
    logger.error(error)
    return res
      .status(constants.HTTP_STATUS_CODE_500)
      .json(errorResponse(constants.HTTP_STATUS_CODE_500, error, messages.ERROR_WHILE_USER_FETCH))
  }
}

const deleteUserById = async (req, res) => {
  try {
    logger.info('# UserController -> deleteUserById start')

    // * Delete user
    const query = {
      where: {
        id: req.params.userid,
        isDeleted: false,
      },
    }

    const user = {
      isDeleted: true,
    }

    const userResponse = await userService.update(query, user)

    return res
      .status(constants.HTTP_STATUS_CODE_200)
      .json(
        successResponse(constants.HTTP_STATUS_CODE_200, userResponse, messages.SUCCESS_USER_DELETE)
      )
  } catch (error) {
    logger.error('# Error while adding user in UserController -> deleteUserById -> catch:')
    logger.error(error)
    return res
      .status(constants.HTTP_STATUS_CODE_500)
      .json(errorResponse(constants.HTTP_STATUS_CODE_500, error, messages.ERROR_WHILE_DELETE_USER))
  }
}

const getAllUsers = async (req, res) => {
  try {
    logger.info('# UserController -> getAllUsers start')

    // * Get all active user
    const query = {
      where: {
        isDeleted: false,
      },
    }

    const users = await userService.findAll(query)

    return res
      .status(constants.HTTP_STATUS_CODE_200)
      .json(successResponse(constants.HTTP_STATUS_CODE_200, users, messages.SUCCESS_USER_FETCH))
  } catch (error) {
    logger.error('# Error while adding user in UserController -> getAllUsers -> catch:')
    logger.error(error)
    return res
      .status(constants.HTTP_STATUS_CODE_500)
      .json(errorResponse(constants.HTTP_STATUS_CODE_500, error, messages.ERROR_WHILE_USER_FETCH))
  }
}

module.exports = {
  addUser,
  updateUserById,
  getUserById,
  deleteUserById,
  getAllUsers,
}
