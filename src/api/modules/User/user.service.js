import BaseService from "../../core/base.service";

export default class UserService extends BaseService {
  static instance;
  static getService() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }
  getRepository() {
    return this.repository;
  }

  //-------- Your code below -------
}
