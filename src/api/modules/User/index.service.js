import Service from '../../core/Service';

export default class AuthService extends Service {
  static instance;

  static getService() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }
}
