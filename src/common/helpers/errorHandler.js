import httpMessage from '../../constants/httpMessage';
/**
 * @description This helper function is used to handle Exception inside ExpressJS application
 */
export default function handleError(err, res) {
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
    message: httpMessage.UNEXPECTED_EXCEPTION,
  });
}
