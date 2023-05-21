const messages = require('../constants/messages')
const constants = require('../constants/constants')
const { logger, errorResponse, getToken, verifyToken } = require('../utils')

const authorizeToken = async (req, res, next) => {
  try {
    // * Get token
    let token = getToken(req)

    if (!token) {
      logger.error(messages.ERROR_INVALID_TOKEN)
      return res
        .status(constants.HTTP_STATUS_CODE_401)
        .json(
          errorResponse(
            constants.HTTP_STATUS_CODE_401,
            constants.HTTP_STATUS_MESSAGE_UNAUTHORIZED,
            messages.ERROR_INVALID_TOKEN
          )
        )
    }

    token = token.split('Bearer')[1].trim()

    // * Verify token
    const tokenVerification = await verifyToken(token)

    if (!tokenVerification) {
      logger.error(messages.ERROR_INVALID_TOKEN)
      return res
        .status(constants.HTTP_STATUS_CODE_401)
        .json(
          errorResponse(
            constants.HTTP_STATUS_CODE_401,
            constants.HTTP_STATUS_MESSAGE_UNAUTHORIZED,
            messages.ERROR_INVALID_TOKEN
          )
        )
    }

    res.setHeader('userData', tokenVerification['userId'])

    next()
  } catch (error) {
    logger.error('# Error while authenticating token in auth middleware')
    logger.error(error)
    return res
      .status(constants.HTTP_STATUS_CODE_401)
      .json(
        errorResponse(constants.HTTP_STATUS_CODE_401, error, messages.ERROR_WHILE_VALIDATE_TOKEN)
      )
  }
}

const authenticateToken = async (req, res, next) => {
  try {
    // * Get token
    let token = getToken(req)

    if (!token) {
      logger.error(messages.ERROR_INVALID_TOKEN)
      return res
        .status(constants.HTTP_STATUS_CODE_401)
        .json(
          errorResponse(
            constants.HTTP_STATUS_CODE_401,
            constants.HTTP_STATUS_MESSAGE_UNAUTHORIZED,
            messages.ERROR_INVALID_TOKEN
          )
        )
    }

    token = token.split('Bearer')[1].trim()

    // * Verify token
    if (token === process.env.TOKEN) {
      next()
    } else {
      logger.error(messages.ERROR_INVALID_TOKEN)
      return res
        .status(constants.HTTP_STATUS_CODE_401)
        .json(
          errorResponse(
            constants.HTTP_STATUS_CODE_401,
            constants.HTTP_STATUS_MESSAGE_UNAUTHORIZED,
            messages.ERROR_INVALID_TOKEN
          )
        )
    }
  } catch (error) {
    logger.error('# Error while authenticating token in auth middleware')
    logger.error(error)
    return res
      .status(constants.HTTP_STATUS_CODE_401)
      .json(
        errorResponse(constants.HTTP_STATUS_CODE_401, error, messages.ERROR_WHILE_VALIDATE_TOKEN)
      )
  }
}

module.exports = {
  authorizeToken,
  authenticateToken,
}
