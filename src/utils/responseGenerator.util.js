const successResponse = (statusCode, data, messgae, extra = null) => {
  return {
    statusCode,
    data,
    messgae,
    extra,
  }
}

const errorResponse = (statusCode, error, messgae, extra = null) => {
  return {
    statusCode,
    error,
    messgae,
    extra,
  }
}

module.exports = {
  successResponse,
  errorResponse,
}
