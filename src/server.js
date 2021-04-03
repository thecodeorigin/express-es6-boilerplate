// ExpressJS dependencies
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import logger from './utils/Winston';
import router from './api/router';
import handleError from './common/helpers/errorHandler';
import './config/env';
import banner from './bootstrap/banner';
// ExpressJS application
const app = express();
// ExpressJS middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Router configuration
router.forEach((route) => {
  if (app.get('env') !== 'test') {
    logger.info(
      `${chalk.green('✓')} ${chalk.bold.blue(
        route.method.toUpperCase()
      )}: ${chalk.blue(route.path)} configured and setup.`
    );
  }
  app[route.method](`/v1${route.path}`, [
    ...route.middlewares,
    ...route.validators,
    ...route.controllers,
  ]);
});

// 404 error handler
app.use((req, res) =>
  res.status(404).json({
    status: 'error',
    code: 404,
    message: `${req.url} not found`,
  })
);

// Error handler
app.use((err, req, res, _next) => {
  return handleError(err, res);
});

// Initialize ExpressJS app
app.set('port', process.env.APP_PORT || 3000);
const server = app.listen(app.get('port'), () => {
  banner();
});

// Export app instance
export default server;
