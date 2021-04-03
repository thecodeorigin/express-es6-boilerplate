import bcrypt from 'bcrypt';
import { HTTPException } from '../../common/helpers/errorHandler';
import httpMessage from '../../constants/httpMessage';

export default class Service {
  getMany() {
    return this.repository.getMany();
  }

  async getOne(id) {
    const user = await this.repository.getOneById(id);
    if (!user) {
      throw new HTTPException(404, httpMessage.USER_NOT_FOUND);
    }
    return user;
  }

  async createOne(payload) {
    const { email, name, password } = payload;
    const user = await this.repository.getOneByEmail(email);
    if (user) {
      throw new HTTPException(400, httpMessage.EMAIL_EXISTS);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const id = await this.repository.createOne({
      email,
      name,
      password: hashPassword,
    });
    return this.repository.getOneById(id);
  }

  async patchOne(id, payload) {
    const { email, name, password } = payload;
    const user = await this.repository.getOneByEmail(email);
    if (user && user.id !== id) {
      throw new HTTPException(400, httpMessage.EMAIL_EXISTS);
    }
    await this.repository.patchOne(id, { email, name, password });
    return this.repository.getOneById(id);
  }

  deleteOne(id) {
    return this.repository.deleteOne(id);
  }
}
