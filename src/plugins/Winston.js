import winston from "winston";
import path from "path";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5,
};

const options = {
  file: {
    level: "info",
    format: winston.format.simple(),
    filename: path.join(__dirname, "../../mylogs/app.log"),
    json: true,
    colorize: false,
  },
  console: {
    level: "verbose",
    format: winston.format.combine(
      winston.format.simple(),
      winston.format.splat(),
      // Time format
      winston.format.timestamp({
        format: "DD-MM-YYYY HH:mm:ss",
      }),
      // Color format
      winston.format.colorize(),
      // Setting log format
      winston.format.printf((log) => {
        if (log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
        return `[${log.timestamp}] [${log.level}] ${log.message}`;
      })
    ),
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    // new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.morganStream = {
  // eslint-disable-next-line no-unused-vars
  write(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message.substring(0, message.lastIndexOf("\n")));
  },
};

export default logger;
