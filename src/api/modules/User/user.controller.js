import BaseController from "../../core/base.controller";
import UserService from "./user.service";

export default class UserController extends BaseController {
  constructor() {
    super();
    this.service = UserService.getService();
  }
}
