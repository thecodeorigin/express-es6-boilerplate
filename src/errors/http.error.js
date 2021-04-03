export default class HTTPException extends Error {
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
