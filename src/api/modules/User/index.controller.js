import '../../../config/env';
import Controller from '../../core/Controller';
import UserService from './index.service';

export default class UserController extends Controller {
  constructor() {
    super();
    this.service = UserService.getService();
  }

  static getController() {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }
}
