import BaseService from "../../core/base.service";
import UserRepository from "./user.repository";

export default class UserService extends BaseService {
  static instance;

  constructor() {
    super()
    this.repository = UserRepository.getRepository();
  }

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
