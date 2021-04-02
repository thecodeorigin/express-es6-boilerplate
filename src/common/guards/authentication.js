import { verify, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { HTTPException } from '../helpers/errorHandler';
import knex from '../../config/connection';
import httpMessage from '../../constants/httpMessage';
import '../../config/env';

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
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      next(new HTTPException(401, httpMessage.LOGIN_REQUIRED));
    }
    if (error instanceof JsonWebTokenError) {
      next(new HTTPException(401, httpMessage.LOGIN_REQUIRED));
    }
    next(error);
  }
}
