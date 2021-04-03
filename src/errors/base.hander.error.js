import _ from 'lodash';

export default class BaseHandlerError extends Error {
  /**
   * @param {*} statusCode : The error status code
   * @param {*} message : The error message
   */
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
  error(statusCode, error) {
    const err = error;
    const {constructor} = error;
    switch (constructor) {
      case EntityNotFoundError:
        err.code = ErrorCode.ENTITY_NOT_FOUND; 
        err.code = `${_.snakeCase(err.entityName).toUpperCase()}_NOT_FOUND` ?? ErrorCode.ENTITY_NOT_FOUND; 
        err.title = __('err.title.system');
        err.error_id = ErrorId.ENTITY_NOT_FOUND;
        err.message = __("err.message.resourceNotFound");
        break;
      case HttpErrors.NotFound:
        err.code = ErrorCode.PAGE_NOT_FOUND; break;
      case HttpErrors.Unauthorized:
        err.code = ErrorCode.INVALID_ACCESS_TOKEN; break;
      case HttpErrors.InternalServerError:
        err.code = ErrorCode.INTERNAL_SERVER_ERROR; break;
      case HttpErrors.BadRequest:
        err.code = ErrorCode.BAD_REQUEST; break;
      case HttpErrors.GatewayTimeout: 
        err.code = ErrorCode.GATEWAY_TIMEOUT; break;
      case HttpErrors.UnsupportedMediaType:
        err.code = ErrorCode.UNSUPPORTED_MEDIA_TYPE; 
        err.title = __('err.title.system');
        err.error_id = ErrorId.UNSUPPORTED_MEDIA_TYPE;
        err.message = __("err.message.unsupportedMediaType");
        break;
      case AuthorizationError:
        err.code = ErrorCode.ACTION_NOT_ALLOWED; 
        err.title = __('err.title.system');
        err.error_id = ErrorId.ACCESS_DENIED;
        err.message = __("err.message.accessDenied");
        break;
      default:
        err.code = err.code ?? ErrorCode.INTERNAL_SERVER_ERROR;
    }
    if(err.code === ErrorCode.INTERNAL_SERVER_ERROR) {
      err.error_id = ErrorId.INTERNAL_SERVER_ERROR;
      err.title = __('err.title.system');
      err.message = __("err.message.internalServerError");
    }
    return {
      statusCode,
      title: err.title,
      error_id: err.error_id,
      message: err.message,
      code: err.code,
      errors: err.errors
    };
  }
}
