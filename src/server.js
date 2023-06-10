require('dotenv').config({ path: '.env' })
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const { logger } = require('./utils')

// * Initialize express app
const app = express()

// * Add cors policy
const corsOptions = {
  origin: (origin, callback) => {
    if (origin) {
      const allowedOrigins = JSON.parse(process.env.ALLOWED_ORIGINS.toString())
      if (
        allowedOrigins.indexOf(origin) === -1 &&
        allowedOrigins.indexOf('*') === -1
      ) {
        callback(new Error('Not allowed by CORS'), false)
      } else {
        callback(null, true)
      }
    } else {
      callback(new Error('Origin not found'), false)
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
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
