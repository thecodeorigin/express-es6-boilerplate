import Hapi from '@hapi/hapi';
import Configs from '../configs';
import { bind } from '../api/routes';
import logger from '../utils/Winston';
import AuthPlugin from '../plugins/AuthPlugin';
import SwaggerPlugin from '../plugins/SwaggerPlugin';
import errorCode from '../constants/errors'

export default class ExpressProvider {
  constructor() {
    this.port = process.env.PORT || Configs.getServerConfigs().port;
    this.host = process.env.HOST || Configs.getServerConfigs().host;
  }

  /**
   * Setting initial feature and plugins
   */
  setting(server) {
    const routes = bind(server);
    Promise.all(routes);
  }

  // eslint-disable-next-line consistent-return
  async register() {
    try {
      const server = new Hapi.Server({
        host: this.host,
        port: this.port,
        routes: {
          cors: {
            origin: ['*']
          }
        }
      });
      server.ext('onPreResponse', (request, h) =>  {
        const response = request.response
        if(response.isBoom) {
          response.output.headers['version'] = process.env.VERSION || '1.0.0'
          response.output.headers['web-version'] = process.env.WEB_VERSION || '1.0.0'
          response.output.headers['android-version'] = process.env.ANDROID_VERSION || '1.0.0'
          response.output.headers['ios-version'] = process.env.IOS_VERSION || '1.0.0'
          response.output.payload.description = errorCode[response.output.payload.message] || 'No description'
          return h.continue
        }
        response.headers['version'] = process.env.VERSION || '1.0.0';
        response.headers['web-version'] = process.env.WEB_VERSION || '1.0.0';
        response.headers['android-version'] = process.env.ANDROID_VERSION || '1.0.0';
        response.headers['ios-version'] = process.env.IOS_VERSION || '1.0.0';
        return h.continue
      });
      await new AuthPlugin().register(server);
      await new SwaggerPlugin().register(server);
      await this.setting(server);

      logger.info('> Hapi OK');
      return server;
    } catch (error) {
      logger.error('Hapi provider error: ', error);
    }
  }
}
