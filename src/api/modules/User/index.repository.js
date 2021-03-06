import Repository from '../../core/Repository';
import knex from '../../../config/connection';

export default class UserRepository extends Repository {
  constructor() {
    super('users');
  }

  static getRepository() {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  async getOneByEmail(email) {
    return knex('users').where({ email }).first();
  }
}
