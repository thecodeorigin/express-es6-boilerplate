import { routerGroup } from "../../../utils";

export default routerGroup(
  {
    name: 'users',
    prefix: '/users',
  },
  {
    method: 'get',
    path: '/',
    validator: null,
    middlewares: [],
    controller: null,
  },
)
