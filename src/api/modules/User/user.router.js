import { routerGroup } from "../../../common/core";
import UserController from "./user.controller";
const userController = new UserController()

export const userRoute = routerGroup(
  {
    name: 'users',
    prefix: '/users',
  },
  {
    method: 'get',
    path: '/',
    validator: null,
    middlewares: [],
    controller: userController.callMethod('getMany'),
  },
)
