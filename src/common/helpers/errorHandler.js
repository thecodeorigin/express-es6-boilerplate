const { UNEXPECTED_EXCEPTION } = require('../../constants/httpMessage');

class HTTPException extends Error {
  /**
   * @param {*} statusCode : The error status code
   * @param {*} message : The error message
   */
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
/**
 * @description This helper function is used to handle Exception inside ExpressJS application
 */
const handleError = (err, res) => {
  // HTTP Exception
  if (err.statusCode && err.message) {
    return res.status(err.statusCode).json({
      status:
        err.statusCode === 400 || err.statusCode === 401 ? 'fail' : 'error',
      statusCode: err.statusCode,
      message: err.message,
    });
  }
  // Database exception
  return res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: UNEXPECTED_EXCEPTION,
  });
};

module.exports = {
  HTTPException,
  handleError,
};
