const winston = require('winston')

// * Define logs levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
}

// * Define level
const level = () => {
  const isLogEnable = process.env.LOGGER_ENABLE || 'true'
  const isDebug = isLogEnable === 'true'
  return isDebug ? 'debug' : 'info'
}

// * Add colorise logs
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'cyan',
}

winston.addColors(colors)

// * Log format
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
)

// * Add log transport
const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
]

// * Create logger
const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

module.exports = {
  logger,
}
