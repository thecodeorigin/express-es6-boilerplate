import HTTPException from '../../errors';

export default class BaseService {
  repository = null;
  getMany(query) {
    return this.repository.find();
  }

  async getOne(id) {
    const user = await this.repository.getOneById(id);
    if (!user) {
      throw new HTTPException(404, httpMessage.USER_NOT_FOUND);
    }
    return user;
  }

  async createOne(payload) {
    return this.repository.createOne(id);
  }

}
