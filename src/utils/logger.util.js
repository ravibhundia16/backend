const winston = require('winston')

// * Define log level
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
}

// * Enable or disable info and debug logs based on env
const level = () => {
  const isLogEnable = process.env.LOGGER_ENABLE || 'true'
  const isDebug = isLogEnable === 'true'
  return isDebug ? 'debug' : 'warn'
}

// * Add colors for different type of logs
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'cyan',
}

// * Add colors to logs
winston.addColors(colors)

// * Log format
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
)

// * Add transport for logger
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
