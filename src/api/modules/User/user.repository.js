import { User } from "../../../models";
import BaseRepository from "../../core/base.repository"

export default class UserRepository extends BaseRepository {
  static instance;
  static getRepository() {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository(User);
    }
    return UserRepository.instance;
  }
}
