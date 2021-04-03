// import SwaggerPlugin from '../plugins/SwaggerPlugin';
import chalk from 'chalk';
import expressWinston from 'express-winston';
import Express from 'express';
import cookieParser from 'cookie-parser';
import logger from '../utils/Winston';
import router from '../api/router';
import banner from '../bootstrap/banner';
import handleError from '../common/helpers/errorHandler';

export default class ExpressProvider {
  constructor() {
    this.port = process.env.APP_PORT || '3000';
    this.host = process.env.APP_HOST || '127.0.0.1';
    this.app = null;
  }

  settingLogger() {
    if (!this.app) {
      this.app = new Express();
    }
    this.app.use(
      expressWinston.logger({
        winstonInstance: logger,
        msg: 'HTTP {{req.method}} {{req.url}}',
      })
    );
  }

  // Setting routes
  settingRoutes() {
    router.forEach((route) => {
      if (this.app.get('env') !== 'test') {
        logger.debug(
          `${chalk.green('✓')} ${chalk.bold.blue(
            route.method.toUpperCase()
          )}: ${chalk.blue(route.path)} configured and setup.`
        );
      }
      this.app[route.method](`/v1${route.path}`, [
        ...route.middlewares,
        ...route.validators,
        ...route.controllers,
      ]);
    });
    // 404 error handler
    this.app.use((req, res) => {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `${req.url} not found`,
      });
    });

    this.app.use(
      expressWinston.errorLogger({
        winstonInstance: logger,
      })
    );
    // Error handler
    this.app.use((err, req, res, _next) => {
      return handleError(err, res);
    });
  }

  async register() {
    try {
      if (!this.app) {
        this.app = new Express();
      }

      this.app.use(Express.json());
      this.app.use(Express.urlencoded({ extended: false }));
      this.app.use(cookieParser());

      this.settingLogger();
      this.settingRoutes();

      this.app.set('port', process.env.APP_PORT || 3000);
      const server = this.app.listen(this.app.get('port'), () => {
        banner();
      });
      return server;
    } catch (error) {
      logger.error('Express provider error: ', error);
    }
  }
}
