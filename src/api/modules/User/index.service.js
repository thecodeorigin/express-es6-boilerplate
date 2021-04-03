import Service from '../../core/Service';
import UserRepository from './index.repository';

export default class UserService extends Service {
  constructor() {
    super();
    this.repository = UserRepository.getRepository();
  }

  static getService() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }
}
