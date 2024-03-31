import winston from 'winston';

const stringFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const jsonFormat = winston.format.combine(
  winston.format.json(),
  winston.format.metadata()
);

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: stringFormat,
    }),
    new winston.transports.File({
      level: 'error',
      format: stringFormat,
      filename: 'log/error.log',
      maxsize: 1000000,
      maxFiles: 2,
    }),
    new winston.transports.File({
      format: stringFormat,
      filename: 'log/combined.log',
      maxsize: 1000000,
      maxFiles: 10,
    }),
  ],
});

export default logger;