import winston from "./Winston";

export const logger = {
  verbose: (message, addition = "") => {
    return winston.verbose(message, addition);
  },
  warn: (message) => {
    return winston.warn(message);
  },
  error: (message, error) => {
    return winston.error(`${message}::${error}`);
  },
  info: (message) => {
    return winston.info(`${message}`);
  },
};
