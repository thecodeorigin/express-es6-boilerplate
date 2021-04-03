import _ from "lodash";

/**
 * @typedef {{name: string, prefix: string}} RouterGroupOption
 * @typedef {{method: string, path: string, handler: function}} Route
 *
 * @param {RouterGroupOption} groupOptions
 * @param {Route} routes
 * @return {Array<Route>}
 */
export const routerGroup = (groupOptions, routes) =>
  routes.map((route) => {
    const method = route.method.toLowerCase();
    const path = `/${[groupOptions.prefix, route.path]
      .map((path) => path.replace(/(^\/|\/$)/g, ""))
      .filter((path) => path !== "")
      .join("/")}`;
    const validator = route.validator || null;
    const middlewares = route.middlewares || [];
    validateRouteConfig(route)
    if (!route.controller) {
      throw Error(
        `No controller for route ${route.method.toLowerCase()} in path ${path}`
      );
    }
    return {
      method,
      path,
      handlers: _.compact([validator, ...middlewares, route.controller]),
    };
  });


const validateRouteConfig = (routeConfig) => {
  if (!routeConfig.path || !routeConfig.method) {
    throw new Error(`No path or method configured`)
  }
  if (!routeConfig.controller) {
    throw new Error(
      `No controller for route ${route.method.toLowerCase()} in path ${route.path}`
    );
  }
}
