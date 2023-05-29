const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const authService = require('./auth.service')
const userService = require('../user/user.service')
const constants = require('../../constants/constants')
const messages = require('../../constants/messages')
const { logger, successResponse, errorResponse, createToken } = require('../../utils')

const login = async (req, res) => {
  try {
    logger.info('# AuthController -> login start')

    // * Get user details
    const query = {
      where: {
        isDeleted: false,
        [Op.or]: [
          {
            email: req.body.username,
          },
          {
            username: req.body.username,
          },
          {
            mobileNumber: req.body.username,
          },
        ],
      },
    }

    const userData = await authService.findOne(query)

    // * User not found
    if (!userData) {
      return res
        .status(constants.HTTP_STATUS_CODE_401)
        .json(
          errorResponse(
            constants.HTTP_STATUS_CODE_401,
            messages.ERROR_INVALID_USERNAME_OR_EMAIL,
            messages.ERROR_INVALID_USERNAME_OR_EMAIL
          )
        )
    }

    // * Compare password
    const validPassword = bcrypt.compare(req.body.password, userData.password)

    // * Password not matched
    if (!validPassword) {
      return res
        .status(constants.HTTP_STATUS_CODE_401)
        .json(
          errorResponse(
            constants.HTTP_STATUS_CODE_401,
            messages.ERROR_INCORRECT_PASSWORD,
            messages.ERROR_INCORRECT_PASSWORD
          )
        )
    }

    // * Generate token
    const token = await createToken(userData.id)

    const userResponse = {
      token,
      ...userData.get(),
    }

    return res
      .status(constants.HTTP_STATUS_CODE_200)
      .json(successResponse(constants.HTTP_STATUS_CODE_200, userResponse, messages.SUCCESS_LOGIN))
  } catch (error) {
    logger.error('# Error while login user in AuthController -> login -> catch:')
    logger.error(error)
    return res
      .status(constants.HTTP_STATUS_CODE_500)
      .json(errorResponse(constants.HTTP_STATUS_CODE_500, error, messages.ERROR_WHILE_LOGIN))
  }
}

const register = async (req, res) => {
  try {
    logger.info('# AuthController -> register start')

    const user = req.body

    // * Check if user is exists or not
    const query = {
      where: {
        isDeleted: false,
        [Op.or]: [
          {
            email: user.email,
          },
          {
            username: user.username,
          },
        ],
      },
    }

    const userData = await authService.findAll(query)

    // * User exists send error
    if (userData && userData.length > 0) {
      return res
        .status(constants.HTTP_STATUS_CODE_400)
        .json(
          errorResponse(
            constants.HTTP_STATUS_CODE_400,
            messages.ERROR_USER_ALREADY_EXISTS,
            messages.ERROR_USER_ALREADY_EXISTS
          )
        )
    }

    // * Encrypt password
    const encryptedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
    user.password = encryptedPassword

    // * Register user
    const userRes = await userService.create(user)

    return res
      .status(constants.HTTP_STATUS_CODE_200)
      .json(successResponse(constants.HTTP_STATUS_CODE_200, userRes, messages.SUCESS_REGISTRATION))
  } catch (error) {
    logger.error('# Error while register user in AuthController -> register -> catch:')
    logger.error(error)
    return res
      .status(constants.HTTP_STATUS_CODE_500)
      .json(errorResponse(constants.HTTP_STATUS_CODE_500, error, messages.ERROR_WHILE_REGISTRATION))
  }
}

const generateToken = async (req, res) => {
  try {
    logger.info('# AuthController -> generateToken start')

    // * Check if user id is available or not
    if (req.query && req.query.userId) {
      // * Generate token
      const token = await createToken(req.query.userId.toString())

      return res
        .status(constants.HTTP_STATUS_CODE_200)
        .json(
          successResponse(constants.HTTP_STATUS_CODE_200, token, 'Token generated successfully')
        )
    } else {
      return res
        .status(constants.HTTP_STATUS_CODE_500)
        .json(
          errorResponse(
            constants.HTTP_STATUS_CODE_500,
            messages.ERROR_USER_ID_NOT_FOUND,
            messages.ERROR_USER_ID_NOT_FOUND
          )
        )
    }
  } catch (error) {
    logger.error('# Error while register user in AuthController -> generateToken -> catch:')
    logger.error(error)
    return res
      .status(constants.HTTP_STATUS_CODE_500)
      .json(
        errorResponse(constants.HTTP_STATUS_CODE_500, error, messages.ERROR_WHILE_GENERATE_TOKEN)
      )
  }
}

module.exports = {
  login,
  register,
  generateToken,
}
