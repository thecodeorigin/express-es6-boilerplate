import ValidationHelper from '../../../common/filters/validation';
import routerGroup from '../../../common/helpers/routerGroup';
import AuthController from './index.controller';

const controller = AuthController.getController();

export default routerGroup(
  {
    name: 'auth',
    prefix: '/auth',
  },
  [
    {
      method: 'post',
      path: '/register',
      middlewares: [],
      validators: [
        ValidationHelper.isNotEmpty('email'),
        ValidationHelper.isEmail('email'),
        ValidationHelper.isNotEmpty('name'),
        ValidationHelper.isNotEmpty('password'),
      ],
      controllers: [controller.register],
    },
    {
      method: 'post',
      path: '/login',
      middlewares: [],
      validators: [
        ValidationHelper.isNotEmpty('email'),
        ValidationHelper.isEmail('email'),
        ValidationHelper.isNotEmpty('password'),
      ],
      controllers: [controller.login],
    },
    {
      method: 'get',
      path: '/me',
      middlewares: [],
      validators: [],
      controllers: [controller.getMe],
    },
  ]
);
