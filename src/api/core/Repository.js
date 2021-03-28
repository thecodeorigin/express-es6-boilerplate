import knex from '../../config/connection';

export default class Repository {
  getMany() {
    return knex('users').select();
  }

  async getOneById(id) {
    return knex('users').where({ id }).first();
  }

  async createOne(payload) {
    return knex('users').insert(payload);
  }

  async patchOne(id, payload) {
    return knex('users').where({ id }).update(payload);
  }

  deleteOne(id) {
    return knex('users').where({ id }).delete();
  }
}
