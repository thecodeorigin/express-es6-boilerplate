import ValidationHelper from '../../../common/filters/validation';
import authentication from '../../../common/guards/authentication';
import { routerGroup } from '../../../common/helpers/routerGroup';
import UserController from './index.controller';

module.exports = routerGroup(
  {
    name: 'users',
    prefix: '/users',
  },
  [
    {
      method: 'get',
      path: '/',
      handlers: [authentication, UserController.getController().getAll],
    },
    {
      method: 'get',
      path: '/:id',
      handlers: [authentication, UserController.getController().getOne],
    },
    {
      method: 'post',
      path: '/',
      handlers: [
        authentication,
        ValidationHelper.isNotEmpty('email'),
        ValidationHelper.isEmail('email'),
        ValidationHelper.isNotEmpty('name'),
        ValidationHelper.isNotEmpty('password'),
        UserController.getController().createOne,
      ],
    },
    {
      method: 'patch',
      path: '/:id',
      handlers: [
        authentication,
        ValidationHelper.isNotEmpty('email', true),
        ValidationHelper.isEmail('email', true),
        ValidationHelper.isNotEmpty('name', true),
        ValidationHelper.isNotEmpty('password', true),
        UserController.getController().patchOne,
      ],
    },
    {
      method: 'delete',
      path: '/:id',
      handlers: [authentication, UserController.getController().deleteOne],
    },
  ]
);
