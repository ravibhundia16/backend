const setToken = (request, response, token) => {
  response.setHeader('authorization', `Bearer ${token}`)
  return response
}

const getToken = (request) => {
  const token = request.headers.authorization
  return token
}

module.exports = {
  setToken,
  getToken,
}
