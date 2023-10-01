import { join } from "path";
import { existsSync, mkdirSync } from "fs";
import winstonDaily from "winston-daily-rotate-file";
import { createLogger, format, transports } from "winston";

import {
  LOGGER_DATE_PATTERN,
  LOGGER_DEBUG_FOLDER,
  LOGGER_ERROR_FOLDER,
  LOGGER_FILE_NAME,
  LOGGER_TIMESTAMP_FORMAT,
} from "src/utils/logger/logger.const";
import { LOG_DIR } from "src/configs/env/env.config";

const { printf, combine, timestamp } = format;
const logDirPath = join(__dirname, "..", "..", "..", `${LOG_DIR || "logs"}`);

if (!existsSync(logDirPath)) {
  mkdirSync(logDirPath);
}

const logFormat = printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp({ format: LOGGER_TIMESTAMP_FORMAT }), logFormat),
  transports: [
    new winstonDaily({
      level: "debug",
      datePattern: LOGGER_DATE_PATTERN,
      dirname: `${logDirPath}${LOGGER_DEBUG_FOLDER}`,
      filename: LOGGER_FILE_NAME,
      maxFiles: 30,
      json: false,
      zippedArchive: true,
    }),
    new winstonDaily({
      level: "error",
      datePattern: LOGGER_DATE_PATTERN,
      dirname: `${logDirPath}${LOGGER_ERROR_FOLDER}`,
      filename: LOGGER_FILE_NAME,
      maxFiles: 30,
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
});

logger.add(
  new transports.Console({
    format: combine(format.splat(), format.colorize()),
  }),
);

const stream = {
  write: (message: string): void => {
    logger.info(message.slice(0, message.lastIndexOf("\n")));
  },
};

export { logger, stream };
