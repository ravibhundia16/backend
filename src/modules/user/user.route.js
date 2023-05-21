const userController = require('./user.controller')
const authMiddleWare = require('../../middleware')

const routes = (router) => {
  // * Insert new user
  router.route('/user').post(authMiddleWare.authorizeToken, userController.addUser)

  // * Update user
  router.route('/user/:userid').put(authMiddleWare.authorizeToken, userController.updateUserById)

  // * Get user
  router.route('/user/:userid').get(authMiddleWare.authorizeToken, userController.getUserById)

  // * Delete user
  router.route('/user/:userid').delete(authMiddleWare.authorizeToken, userController.deleteUserById)

  // * Get all users
  router.route('/getAll').get(authMiddleWare.authorizeToken, userController.getAllUsers)

  return { router: router, apiPrefix: '/v1' }
}

module.exports = {
  routes,
}
