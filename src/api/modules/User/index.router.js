import ValidationHelper from '../../../common/filters/validation';
import authentication from '../../../common/guards/authentication';
import { routerGroup } from '../../../common/helpers/routerGroup';
import UserController from './index.controller';

const controller = UserController.getController();
module.exports = routerGroup(
  {
    name: 'users',
    prefix: '/users',
  },
  [
    {
      method: 'get',
      path: '/',
      middlewares: [authentication],
      validators: [],
      controllers: [controller.getMany],
    },
    {
      method: 'get',
      path: '/:id',
      middlewares: [authentication],
      validators: [],
      controllers: [controller.getOne],
    },
    {
      method: 'post',
      path: '/',
      middlewares: [authentication],
      validators: [
        ValidationHelper.isNotEmpty('email'),
        ValidationHelper.isEmail('email'),
        ValidationHelper.isNotEmpty('name'),
        ValidationHelper.isNotEmpty('password'),
      ],
      controllers: [controller.createOne],
    },
    {
      method: 'patch',
      path: '/:id',
      middlewares: [authentication],
      validators: [
        ValidationHelper.isNotEmpty('email', true),
        ValidationHelper.isEmail('email', true),
        ValidationHelper.isNotEmpty('name', true),
        ValidationHelper.isNotEmpty('password', true),
      ],
      controllers: [controller.patchOne],
    },
    {
      method: 'delete',
      path: '/:id',
      middlewares: [authentication],
      validators: [],
      controllers: [controller.deleteOne],
    },
  ]
);
