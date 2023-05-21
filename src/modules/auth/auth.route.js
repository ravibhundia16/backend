const authController = require('./auth.controller')

const routes = (router) => {
  // * Login
  router.route('/login').post(authController.login)

  // * Register
  router.route('/signup').post(authController.register)

  // * Generate token
  router.route('/generate/token').get(authController.generateToken)

  return { router: router, apiPrefix: '/v1' }
}

module.exports = {
  routes,
}
