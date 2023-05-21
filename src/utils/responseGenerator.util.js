const successResponse = (statusCode, data, messgae) => {
  return {
    statusCode,
    data,
    messgae,
  }
}

const errorResponse = (statusCode, error, messgae) => {
  return {
    statusCode,
    error,
    messgae,
  }
}

module.exports = {
  successResponse,
  errorResponse,
}
