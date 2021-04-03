import logger from '../utils/Winston';
import '../config/env';
import pkj from '../../package.json';

export default function banner() {
  const route = () =>
    `http://${process.env.APP_HOST || 'localhost'}:${process.env.APP_PORT}`;
  if (['development', 'staging'].includes(process.env.NODE_ENV.trim())) {
    logger.debug('');
    logger.debug(
      `Your API is ready on ${route()}${process.env.APP_ROUTE_PREFIX}`
    );
    logger.debug('To shut it down, press <CTRL> + C at any time.');
    logger.debug('');
    logger.debug('-------------------------------------------------------');
    logger.debug(`Project name : ${pkj.name}`);
    logger.debug(`Environment  : ${process.env.NODE_ENV || 'development'}`);
    logger.debug(`Version      : ${pkj.version}`);
    logger.debug('');
    logger.debug(`API Info     : ${route()}${process.env.APP_ROUTE_PREFIX}`);
    logger.debug(`Swagger      : ${route()}${process.env.SWAGGER_ROUTE}`);
    logger.debug('-------------------------------------------------------');
    logger.debug('');
  }
  if (process.env.NODE_ENV === 'production') {
    logger.info(`> Server is running at: ${route()}`);
  }
}
