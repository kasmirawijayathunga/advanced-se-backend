import { createLogger, format, transports } from 'winston';
import config from './config';

const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: format.combine(
    enumerateErrorFormat(),
    config.env === 'development' ? format.colorize() : format.uncolorize(),
    format.splat(),
    format.printf((info) => `${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      stderrLevels: ['error'],
    }),
    new transports.File({ filename: 'logs/warning.log', level: 'warning' }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;
