/**
 * @typedef {{name: string, prefix: string}} RouterGroupOption
 * @typedef {{method: string, path: string, handler: function}} Route
 *
 * @param {RouterGroupOption} groupOptions
 * @param {Route} routes
 * @return {Array<Route>}
 */
export default function routerGroup(groupOptions, routes) {
  return routes.map((route) => ({
    ...route,
    method: route.method.toLowerCase(),
    // Paste absolute path
    path: `/${[groupOptions.prefix, route.path]
      .map((path) => path.replace(/(^\/|\/$)/g, ''))
      .filter((path) => path !== '')
      .join('/')}`,
  }));
}
