import '../../../config/env';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { HTTPException } from '../../../common/helpers/errorHandler';
import httpMessage from '../../../constants/httpMessage';
import Service from '../../core/Service';
import UserRepository from '../User/index.repository';

export default class AuthService extends Service {
  static instance;

  constructor() {
    super();
    this.repository = UserRepository.getRepository();
  }

  static getService() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(payload) {
    const { email, password } = payload;
    const user = await this.repository.getOneByEmail(email);
    if (!user) {
      throw new HTTPException(404, httpMessage.USER_NOT_FOUND);
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      throw new HTTPException(401, httpMessage.INVALID_CREDENTIAL);
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: parseInt(process.env.JWT_EXPIRE, 10),
      noTimestamp: true,
    });
    return {
      ...user,
      token,
    };
  }

  async register(payload) {
    const { email, name, password } = payload;
    const hash = await bcrypt.hash(password, 10);
    const user = await this.repository.getOneByEmail(email);
    console.log(user);
    if (user) {
      throw new HTTPException(400, httpMessage.EMAIL_EXISTS);
    }
    const id = await this.repository.createOne({
      email,
      name,
      password: hash,
    });
    return this.repository.getOneById(id);
  }

  getMe(payload) {
    if (!payload) {
      throw new HTTPException(401, httpMessage.LOGIN_REQUIRED);
    }
    const decoded = jwt.verify(payload, process.env.JWT_SECRET);
    return this.repository.getOneById(decoded.id);
  }
}
