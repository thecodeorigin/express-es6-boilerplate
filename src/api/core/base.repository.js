export default class BaseRepository {
  constructor(model) {
    // this.tableName = tableName;
    this.model = model;
    this.collection = model.collection.collectionName
  }

  execute(query) {
    // Do raw execute
  }

  count() {
    return this.model.estimatedDocumentCount()
  }

  find() {
    return this.model.find();
  }

  create(payload) {
    return this.model.create(payload)
  }

  update(id, payload) {
    return this.model.findByIdAndUpdate(id, payload)
  }

  delete(id) {
    throw new Error("Method not implemented.");
  }
  

  findById(id) {
    return this.model.findById(id)
    throw new Error("Method not implemented.");
  }

  async getOneById(id) {
    return this.model.findOneById(id)
  }

  async createOne(payload) {
    return this.model.insert(payload)
  }
}
