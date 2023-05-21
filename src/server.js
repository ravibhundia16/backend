require('dotenv').config({ path: '.env' })
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const rootRoute = require('./routes')
const { logger } = require('./utils/logger.util')

// * Initialize express app
const app = express()

// * Initialize express router
const router = express.Router()

// * Add cors policy
const corsOptions = {
  origin: (origin, callback) => {
    if (origin) {
      if (process.env.ALLOWED_ORIGINS.indexOf(origin) === -1) {
        callback(new Error('Not allowed by CORS'), false)
      } else {
        callback(null, true)
      }
    } else {
      callback(new Error('Origin not found'), false)
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'authorization', 'origin'],
}
app.use('*', cors(corsOptions))

// * Parse JSON request body
app.use(express.json())

// * Parse urlencoded request body
app.use(express.urlencoded({ extended: false }))

// * Show routes called in console
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// * Armoring the API with helmet
app.use(helmet())

// * Initialize routes
const allRoutes = rootRoute.createAllRoutes(router)
app.use('/api', allRoutes)

app.use('/check', (req, res) => {
  res.status(200).json({
    statusCode: 200,
    data: {},
    message: 'Server is running',
  })
})

// * Start server
const start = () => {
  app.listen(process.env.PORT, () => {
    logger.info(`# Server is running on port: ${process.env.PORT}`)
  })
}

start()
