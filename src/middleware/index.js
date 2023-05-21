const { authenticateToken, authorizeToken } = require('./auth.middleware')

module.exports = {
  authenticateToken,
  authorizeToken,
}
