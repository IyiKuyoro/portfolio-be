import winston, { format } from 'winston';

const logger = winston.createLogger({
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  level: 'info',
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

export default logger;
