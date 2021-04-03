export default class Controller {
  getMany = async (_req, res, next) => {
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
  };

  getOne = async (req, res, next) => {
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
  };

  createOne = async (req, res, next) => {
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
  };

  patchOne = async (req, res, next) => {
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
  };

  deleteOne = async (req, res, next) => {
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
  };
}
