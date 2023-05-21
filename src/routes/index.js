const { UserRoute } = require('../modules/user')
const { AuthRoute } = require('../modules/auth')

const getAllRoutes = (router) => {
  const { router: userRoute, apiPrefix: userPrefix } = UserRoute.routes(router)

  const { router: authRoute, apiPrefix: authPrefix } = AuthRoute.routes(router)

  const allRoutes = [
    {
      path: userPrefix,
      route: userRoute,
    },
    {
      path: authPrefix,
      route: authRoute,
    },
  ]

  return allRoutes
}

const createAllRoutes = (router) => {
  const allRoutes = getAllRoutes(router)

  allRoutes.forEach((route) => {
    router.use(route.path, route.route)
  })

  return router
}

module.exports = {
  createAllRoutes,
}
