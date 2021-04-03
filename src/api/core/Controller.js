export default class Controller {
  constructor() {
    this.bindMethods();
  }

  bindMethods() {
    // Get methods
    const proto = Object.getPrototypeOf(this);
    const methods = [
      ...Object.getOwnPropertyNames(Controller.prototype),
      ...Object.getOwnPropertyNames(proto),
    ];
    // Bind methods
    methods.forEach((method) => {
      if (typeof this[method] === 'function') {
        this[method] = this[method].bind(this);
      }
    });
  }

  async getMany(_req, res, next) {
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
      const { id } = req.params;
      const data = await this.service.getOne(id);
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
      const data = await this.service.createOne(req.body);
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
      const { id } = req.params;
      const data = await this.service.patchOne(id, req.body);
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
      const { id } = req.params;
      await this.service.deleteOne(id);
      return res.status(200).json({
        status: 'success',
        statusCode: 200,
      });
    } catch (err) {
      return next(err);
    }
  }
}
