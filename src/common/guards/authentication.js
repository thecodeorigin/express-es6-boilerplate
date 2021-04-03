import { verify, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import knex from '../../config/connection';
import httpMessage from '../../constants/httpMessage';
import '../../config/env';
import HTTPException from '../../utils/HTTPException';

/**
 *  @description This is a middleware used for authenticating validation. Inject this in your routing configuration
 */
export default async function authentication(req, res, next) {
  try {
    const { token } = req.headers;
    if (!token) {
      throw new HTTPException(401, httpMessage.LOGIN_REQUIRED);
    }
    const data = verify(token, process.env.JWT_SECRET);
    const user = await knex('users').where({ id: data.id }).first();
    if (!user) {
      throw new HTTPException(401, httpMessage.USER_NOT_FOUND);
    }
    req.user = user;
    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(new HTTPException(401, httpMessage.LOGIN_REQUIRED));
    }
    if (error instanceof JsonWebTokenError) {
      return next(new HTTPException(401, httpMessage.LOGIN_REQUIRED));
    }
    return next(error);
  }
}
