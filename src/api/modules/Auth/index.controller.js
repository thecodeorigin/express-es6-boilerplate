import '../../../config/env';
import jwt from 'jsonwebtoken';
import Controller from '../../core/Controller';
import AuthService from './index.service';
import httpMessage from '../../../constants/httpMessage';
import HTTPException from '../../../utils/HTTPException';

export default class AuthController extends Controller {
  constructor() {
    super();
    this.service = AuthService.getService();
  }

  static getController() {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  }

  login = async (req, res, next) => {
    try {
      const payload = { email: req.body.email, password: req.body.password };
      const data = await this.service.login(payload);
      return res.json({
        status: 'success',
        statusCode: 200,
        data,
      });
    } catch (error) {
      return next(error);
    }
  };

  register = async (req, res, next) => {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
      };
      const data = await this.service.register(payload);
      return res.json({
        status: 'success',
        statusCode: 200,
        data,
      });
    } catch (error) {
      return next(error);
    }
  };

  getMe = async (req, res, next) => {
    try {
      const payload = req.headers.token;
      const data = await this.service.getMe(payload);
      return res.json({
        status: 'success',
        statusCode: 200,
        data,
      });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return next(new HTTPException(401, httpMessage.LOGIN_REQUIRED));
      }
      if (error instanceof jwt.JsonWebTokenError) {
        return next(new HTTPException(401, httpMessage.LOGIN_REQUIRED));
      }
      return next(error);
    }
  };
}
