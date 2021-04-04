import { ResponseHandler } from "../../common/core";
export default class BaseController {
  // Base function
  filterFields(input, fields, addition) {
    let newInput = {};
    fields.forEach((field) => {
      if (typeof field === 'object') {
        if (field.noEmptyString && input[field.name]) {
          newInput[field.name] = input[field.name];
        }
      } else if (input[field] !== undefined) {
        newInput[field] = input[field];
      }
    });

    if (addition) {
      newInput = Object.assign(newInput, addition);
    }

    return newInput;
  }

  callMethod(method) {
    return async (req, res, next) => {
      try {
        // this.cUser = req.session.cUser;
        const data = await this[method](req, res, next);
        return res.json(ResponseHandler.success(data))
      } catch (e) {
        console.log(e.message, e.stack);
        if (req.headers['content-type'] === 'application/json' ||
          req.headers['x-requested-with'] === 'XMLHttpRequest') {
          return res.json(ResponseHandler.findByCode(e.code));
        }

        return next(e);
      }
    };
  }


  getMany(request, response) {
    return this.service.getMany(request.query);
  }

  getOne(request, response) {
    const { id } = request.params;
    return this.service.getOne(id);
  }

  createOne(request, response) {
    const { payload } = request;
    return this.service.createOne(payload);
  }
}
