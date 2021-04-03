import knex from '../../config/connection';

export default class Repository {
  constructor(tableName) {
    this.tableName = tableName;
  }

  getMany() {
    return knex(this.tableName).select();
  }

  async getOneById(id) {
    return knex(this.tableName).where({ id }).first();
  }

  async createOne(payload) {
    return knex(this.tableName).insert(payload);
  }

  async patchOne(id, payload) {
    return knex(this.tableName).where({ id }).update(payload);
  }

  deleteOne(id) {
    return knex(this.tableName).where({ id }).delete();
  }
}
