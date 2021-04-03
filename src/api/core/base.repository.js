export default class BaseRepository {
  constructor(model) {
    // this.tableName = tableName;
    this.model = model;
  }
  getMany() {
    return this.model.find();
  }

  async getOneById(id) {
    return this.model.findOneById(id)
  }

  async createOne(payload) {
    return this.model.insert(payload)
  }
}
