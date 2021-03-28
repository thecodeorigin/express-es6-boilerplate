import '../../../config/env';
import Controller from '../../core/Controller';
import AuthService from './index.service';

export default class AuthController extends Controller {
  constructor() {
    super();
    this.service = AuthService.getService();
  }

  static instance;

  static getController() {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  }
}
