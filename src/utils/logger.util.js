const winston = require('winston')

// * Define different log level for different type of logs
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
}

// * Enable or disable info/debug logs based on env variable
const level = () => {
  const isLogEnable = process.env.LOGGER_ENABLE || 'true'
  const isDebug = isLogEnable === 'true'
  return isDebug ? 'debug' : 'warn'
}

// * Colors for different type of logs
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
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
)

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
]

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

module.exports = {
  logger,
}
