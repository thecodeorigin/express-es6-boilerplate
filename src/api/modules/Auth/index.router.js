import ValidationHelper from '../../../common/filters/validation';
import { routerGroup } from '../../../common/helpers/routerGroup';
import AuthController from './index.controller';

export default routerGroup(
  {
    name: 'auth',
    prefix: '/auth',
  },
  [
    {
      method: 'post',
      path: '/register',
      handlers: [
        ValidationHelper.isNotEmpty('email'),
        ValidationHelper.isEmail('email'),
        ValidationHelper.isNotEmpty('name'),
        ValidationHelper.isNotEmpty('password'),
        AuthController.getController().register.bind(
          AuthController.getController()
        ),
      ],
    },
    {
      method: 'post',
      path: '/login',
      handlers: [
        ValidationHelper.isNotEmpty('email'),
        ValidationHelper.isEmail('email'),
        ValidationHelper.isNotEmpty('password'),
        AuthController.getController().login.bind(
          AuthController.getController()
        ),
      ],
    },
    {
      method: 'get',
      path: '/me',
      handlers: [
        AuthController.getController().getMe.bind(
          AuthController.getController()
        ),
      ],
    },
  ]
);
