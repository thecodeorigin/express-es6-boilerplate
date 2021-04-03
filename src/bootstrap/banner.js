import logger from '../utils/Winston';
import '../config/env';
import pkj from '../../package.json';

export default function banner() {
  const route = () =>
    `http://${process.env.APP_HOST || 'localhost'}:${process.env.APP_PORT}`;
  if (process.env.NODE_ENV !== 'test') {
    logger.info('');
    logger.info(
      `Your API is ready on ${route()}${process.env.APP_ROUTE_PREFIX}`
    );
    logger.info('To shut it down, press <CTRL> + C at any time.');
    logger.info('');
    logger.info('-------------------------------------------------------');
    logger.info(`Project name : ${pkj.name}`);
    logger.info(`Environment  : ${process.env.NODE_ENV || 'development'}`);
    logger.info(`Version      : ${pkj.version}`);
    logger.info('');
    logger.info(`API Info     : ${route()}${process.env.APP_ROUTE_PREFIX}`);
    logger.info(`Swagger      : ${route()}${process.env.SWAGGER_ROUTE}`);
    logger.info('-------------------------------------------------------');
    logger.info('');
  } else {
    logger.info(`> Server is running at: ${route()}`);
  }
}
