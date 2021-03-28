export default class Controller {
  async getMany(req, res, next) {
    try {
      const data = await this.service.getMany();
      return res.status(200).json({
        status: 'success',
        statusCode: 200,
        data,
      });
    } catch (err) {
      return next(err);
    }
  }

  async getOne(req, res, next) {
    try {
      const payload = req.params.id;
      const data = await this.service.getOne(payload);
      return res.json({
        status: 'success',
        statusCode: 200,
        data,
      });
    } catch (err) {
      return next(err);
    }
  }

  async createOne(req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
      };
      const data = await this.service.createOne(payload);
      return res.status(201).json({
        status: 'success',
        statusCode: 201,
        data,
      });
    } catch (err) {
      return next(err);
    }
  }

  async patchOne(req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
      };
      const data = await this.service.patchOne(payload);
      return res.status(201).json({
        status: 'success',
        statusCode: 201,
        data,
      });
    } catch (err) {
      return next(err);
    }
  }

  async deleteOne(req, res, next) {
    try {
      await this.service.deleteOne(req.params.id);
      return res.status(200).json({
        status: 'success',
        statusCode: 200,
      });
    } catch (err) {
      return next(err);
    }
  }
}
